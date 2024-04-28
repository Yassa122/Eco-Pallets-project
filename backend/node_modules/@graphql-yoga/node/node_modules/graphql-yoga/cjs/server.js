"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createYoga = exports.YogaServer = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-explicit-any */
const core_1 = require("@envelop/core");
const validation_cache_1 = require("@envelop/validation-cache");
const executor_1 = require("@graphql-tools/executor");
const defaultFetchAPI = tslib_1.__importStar(require("@whatwg-node/fetch"));
const server_1 = require("@whatwg-node/server");
const graphql_1 = require("graphql");
const error_js_1 = require("./error.js");
const logger_1 = require("@graphql-yoga/logger");
const GET_js_1 = require("./plugins/requestParser/GET.js");
const POSTFormUrlEncoded_js_1 = require("./plugins/requestParser/POSTFormUrlEncoded.js");
const POSTGraphQLString_js_1 = require("./plugins/requestParser/POSTGraphQLString.js");
const POSTJson_js_1 = require("./plugins/requestParser/POSTJson.js");
const POSTMultipart_js_1 = require("./plugins/requestParser/POSTMultipart.js");
const useCheckGraphQLQueryParams_js_1 = require("./plugins/requestValidation/useCheckGraphQLQueryParams.js");
const useCheckMethodForGraphQL_js_1 = require("./plugins/requestValidation/useCheckMethodForGraphQL.js");
const useHTTPValidationError_js_1 = require("./plugins/requestValidation/useHTTPValidationError.js");
const useLimitBatching_js_1 = require("./plugins/requestValidation/useLimitBatching.js");
const usePreventMutationViaGET_js_1 = require("./plugins/requestValidation/usePreventMutationViaGET.js");
const useGraphiQL_js_1 = require("./plugins/useGraphiQL.js");
const useHealthCheck_js_1 = require("./plugins/useHealthCheck.js");
const useParserAndValidationCache_js_1 = require("./plugins/useParserAndValidationCache.js");
const useRequestParser_js_1 = require("./plugins/useRequestParser.js");
const useResultProcessor_js_1 = require("./plugins/useResultProcessor.js");
const useSchema_js_1 = require("./plugins/useSchema.js");
const useUnhandledRoute_js_1 = require("./plugins/useUnhandledRoute.js");
const process_request_js_1 = require("./process-request.js");
const mask_error_js_1 = require("./utils/mask-error.js");
/**
 * Base class that can be extended to create a GraphQL server with any HTTP server framework.
 * @internal
 */
class YogaServer {
    constructor(options) {
        this.handle = async (request, serverContext) => {
            let url = new Proxy({}, {
                get: (_target, prop, _receiver) => {
                    url = new this.fetchAPI.URL(request.url, 'http://localhost');
                    return Reflect.get(url, prop, url);
                },
            });
            let requestParser;
            const onRequestParseDoneList = [];
            for (const onRequestParse of this.onRequestParseHooks) {
                const onRequestParseResult = await onRequestParse({
                    request,
                    url,
                    requestParser,
                    serverContext,
                    setRequestParser(parser) {
                        requestParser = parser;
                    },
                });
                if (onRequestParseResult?.onRequestParseDone != null) {
                    onRequestParseDoneList.push(onRequestParseResult.onRequestParseDone);
                }
            }
            this.logger.debug(`Parsing request to extract GraphQL parameters`);
            if (!requestParser) {
                return new this.fetchAPI.Response(null, {
                    status: 415,
                    statusText: 'Unsupported Media Type',
                });
            }
            let requestParserResult = await requestParser(request);
            for (const onRequestParseDone of onRequestParseDoneList) {
                await onRequestParseDone({
                    requestParserResult,
                    setRequestParserResult(newParams) {
                        requestParserResult = newParams;
                    },
                });
            }
            const result = (await (Array.isArray(requestParserResult)
                ? Promise.all(requestParserResult.map((params) => this.getResultForParams({
                    params,
                    request,
                }, serverContext)))
                : this.getResultForParams({
                    params: requestParserResult,
                    request,
                }, serverContext)));
            return (0, process_request_js_1.processResult)({
                request,
                result,
                fetchAPI: this.fetchAPI,
                onResultProcessHooks: this.onResultProcessHooks,
            });
        };
        this.id = options?.id ?? 'yoga';
        this.fetchAPI = {
            ...defaultFetchAPI,
        };
        if (options?.fetchAPI) {
            for (const key in options.fetchAPI) {
                if (options.fetchAPI[key]) {
                    this.fetchAPI[key] =
                        options.fetchAPI[key];
                }
            }
        }
        const logger = options?.logging == null ? true : options.logging;
        this.logger =
            typeof logger === 'boolean'
                ? logger === true
                    ? (0, logger_1.createLogger)()
                    : (0, logger_1.createLogger)('silent')
                : typeof logger === 'string'
                    ? (0, logger_1.createLogger)(logger)
                    : logger;
        const maskErrorFn = (typeof options?.maskedErrors === 'object' &&
            options.maskedErrors.maskError) ||
            mask_error_js_1.maskError;
        const maskedErrorSet = new WeakSet();
        this.maskedErrorsOpts =
            options?.maskedErrors === false
                ? null
                : {
                    errorMessage: 'Unexpected error.',
                    ...(typeof options?.maskedErrors === 'object'
                        ? options.maskedErrors
                        : {}),
                    maskError: (error, message) => {
                        if (maskedErrorSet.has(error)) {
                            return error;
                        }
                        const newError = maskErrorFn(error, message, this.maskedErrorsOpts?.isDev);
                        if (newError !== error) {
                            this.logger.error(error);
                        }
                        maskedErrorSet.add(newError);
                        return newError;
                    },
                };
        const maskedErrors = this.maskedErrorsOpts == null ? null : this.maskedErrorsOpts;
        let batchingLimit = 0;
        if (options?.batching) {
            if (typeof options.batching === 'boolean') {
                batchingLimit = 10;
            }
            else {
                batchingLimit = options.batching.limit ?? 10;
            }
        }
        this.graphqlEndpoint = options?.graphqlEndpoint || '/graphql';
        const graphqlEndpoint = this.graphqlEndpoint;
        this.plugins = [
            (0, core_1.useEngine)({
                parse: graphql_1.parse,
                validate: graphql_1.validate,
                execute: executor_1.normalizedExecutor,
                subscribe: executor_1.normalizedExecutor,
                specifiedRules: graphql_1.specifiedRules,
            }),
            // Use the schema provided by the user
            !!options?.schema && (0, useSchema_js_1.useSchema)(options.schema),
            options?.context != null &&
                (0, core_1.useExtendContext)((initialContext) => {
                    if (options?.context) {
                        if (typeof options.context === 'function') {
                            return options.context(initialContext);
                        }
                        return options.context;
                    }
                    return {};
                }),
            // Middlewares before processing the incoming HTTP request
            (0, useHealthCheck_js_1.useHealthCheck)({
                id: this.id,
                logger: this.logger,
                endpoint: options?.healthCheckEndpoint,
            }),
            options?.cors !== false && (0, server_1.useCORS)(options?.cors),
            options?.graphiql !== false &&
                (0, useGraphiQL_js_1.useGraphiQL)({
                    graphqlEndpoint,
                    options: options?.graphiql,
                    render: options?.renderGraphiQL,
                    logger: this.logger,
                }),
            // Middlewares before the GraphQL execution
            (0, useRequestParser_js_1.useRequestParser)({
                match: GET_js_1.isGETRequest,
                parse: GET_js_1.parseGETRequest,
            }),
            (0, useRequestParser_js_1.useRequestParser)({
                match: POSTJson_js_1.isPOSTJsonRequest,
                parse: POSTJson_js_1.parsePOSTJsonRequest,
            }),
            options?.multipart !== false &&
                (0, useRequestParser_js_1.useRequestParser)({
                    match: POSTMultipart_js_1.isPOSTMultipartRequest,
                    parse: POSTMultipart_js_1.parsePOSTMultipartRequest,
                }),
            (0, useRequestParser_js_1.useRequestParser)({
                match: POSTGraphQLString_js_1.isPOSTGraphQLStringRequest,
                parse: POSTGraphQLString_js_1.parsePOSTGraphQLStringRequest,
            }),
            (0, useRequestParser_js_1.useRequestParser)({
                match: POSTFormUrlEncoded_js_1.isPOSTFormUrlEncodedRequest,
                parse: POSTFormUrlEncoded_js_1.parsePOSTFormUrlEncodedRequest,
            }),
            // Middlewares after the GraphQL execution
            (0, useResultProcessor_js_1.useResultProcessors)({
                legacySSE: options?.legacySse !== false,
            }),
            (0, server_1.useErrorHandling)((error, request) => {
                const errors = (0, error_js_1.handleError)(error, this.maskedErrorsOpts, this.logger);
                const result = {
                    errors,
                };
                return (0, process_request_js_1.processResult)({
                    request,
                    result,
                    fetchAPI: this.fetchAPI,
                    onResultProcessHooks: this.onResultProcessHooks,
                });
            }),
            ...(options?.plugins ?? []),
            // To make sure those are called at the end
            {
                onPluginInit({ addPlugin }) {
                    // Performance things
                    if (options?.parserCache !== false) {
                        const parserAndValidationCacheOptions = {};
                        if (typeof options?.parserCache === 'object') {
                            parserAndValidationCacheOptions.documentCache =
                                options.parserCache.documentCache;
                            parserAndValidationCacheOptions.errorCache =
                                options.parserCache.errorCache;
                        }
                        if (options?.validationCache === false) {
                            parserAndValidationCacheOptions.validationCache = false;
                        }
                        else if (typeof options?.validationCache === 'object') {
                            // TODO: Remove this in the next major version
                            // Backward compatibility for the old API
                            parserAndValidationCacheOptions.validationCache = false;
                            addPlugin(
                            // @ts-expect-error Add plugins has context but this hook doesn't care
                            (0, validation_cache_1.useValidationCache)({
                                cache: options.validationCache,
                            }));
                        }
                        addPlugin(
                        // @ts-expect-error Add plugins has context but this hook doesn't care
                        (0, useParserAndValidationCache_js_1.useParserAndValidationCache)(parserAndValidationCacheOptions));
                    }
                    // @ts-expect-error Add plugins has context but this hook doesn't care
                    addPlugin((0, useLimitBatching_js_1.useLimitBatching)(batchingLimit));
                    // @ts-expect-error Add plugins has context but this hook doesn't care
                    addPlugin((0, useCheckGraphQLQueryParams_js_1.useCheckGraphQLQueryParams)());
                    addPlugin(
                    // @ts-expect-error Add plugins has context but this hook doesn't care
                    (0, useUnhandledRoute_js_1.useUnhandledRoute)({
                        graphqlEndpoint,
                        showLandingPage: options?.landingPage ?? true,
                    }));
                    // We check the method after user-land plugins because the plugin might support more methods (like graphql-sse).
                    // @ts-expect-error Add plugins has context but this hook doesn't care
                    addPlugin((0, useCheckMethodForGraphQL_js_1.useCheckMethodForGraphQL)());
                    // We make sure that the user doesn't send a mutation with GET
                    // @ts-expect-error Add plugins has context but this hook doesn't care
                    addPlugin((0, usePreventMutationViaGET_js_1.usePreventMutationViaGET)());
                    if (maskedErrors) {
                        addPlugin((0, core_1.useMaskedErrors)(maskedErrors));
                    }
                    addPlugin(
                    // We handle validation errors at the end
                    (0, useHTTPValidationError_js_1.useHTTPValidationError)());
                },
            },
        ];
        this.getEnveloped = (0, core_1.envelop)({
            plugins: this.plugins,
        });
        this.plugins = this.getEnveloped._plugins;
        this.onRequestParseHooks = [];
        this.onParamsHooks = [];
        this.onResultProcessHooks = [];
        for (const plugin of this.plugins) {
            if (plugin) {
                if (plugin.onYogaInit) {
                    plugin.onYogaInit({
                        yoga: this,
                    });
                }
                if (plugin.onRequestParse) {
                    this.onRequestParseHooks.push(plugin.onRequestParse);
                }
                if (plugin.onParams) {
                    this.onParamsHooks.push(plugin.onParams);
                }
                if (plugin.onResultProcess) {
                    this.onResultProcessHooks.push(plugin.onResultProcess);
                }
            }
        }
    }
    async getResultForParams({ params, request, }, 
    // eslint-disable-next-line @typescript-eslint/ban-types
    ...args) {
        try {
            let result;
            for (const onParamsHook of this.onParamsHooks) {
                await onParamsHook({
                    params,
                    request,
                    setParams(newParams) {
                        params = newParams;
                    },
                    setResult(newResult) {
                        result = newResult;
                    },
                    fetchAPI: this.fetchAPI,
                });
            }
            if (result == null) {
                const serverContext = args[0];
                const initialContext = {
                    ...serverContext,
                    request,
                    params,
                };
                const enveloped = this.getEnveloped(initialContext);
                this.logger.debug(`Processing GraphQL Parameters`);
                result = await (0, process_request_js_1.processRequest)({
                    params,
                    enveloped,
                });
                this.logger.debug(`Processing GraphQL Parameters done.`);
            }
            return result;
        }
        catch (error) {
            const errors = (0, error_js_1.handleError)(error, this.maskedErrorsOpts, this.logger);
            const result = {
                errors,
            };
            return result;
        }
    }
}
exports.YogaServer = YogaServer;
function createYoga(options) {
    const server = new YogaServer(options);
    return (0, server_1.createServerAdapter)(server, {
        fetchAPI: server.fetchAPI,
        plugins: server['plugins'],
    });
    // TODO: Fix in @whatwg-node/server later
}
exports.createYoga = createYoga;
