import { GetEnvelopedFn, PromiseOrValue } from '@envelop/core';
import { ValidationCache } from '@envelop/validation-cache';
import { ServerAdapter, ServerAdapterBaseObject, ServerAdapterRequestHandler, useCORS } from '@whatwg-node/server';
import { ExecutionResult } from 'graphql';
import { LogLevel, YogaLogger } from '@graphql-yoga/logger';
import { Plugin } from './plugins/types.js';
import { GraphiQLOptions, GraphiQLOptionsOrFactory } from './plugins/useGraphiQL.js';
import { ParserAndValidationCacheOptions } from './plugins/useParserAndValidationCache.js';
import { YogaSchemaDefinition } from './plugins/useSchema.js';
import { FetchAPI, GraphQLParams, YogaInitialContext, YogaMaskedErrorOpts } from './types.js';
/**
 * Configuration options for the server
 */
export type YogaServerOptions<TServerContext, TUserContext> = {
    /**
     * Enable/disable logging or provide a custom logger.
     * @default true
     */
    logging?: boolean | YogaLogger | LogLevel;
    /**
     * Prevent leaking unexpected errors to the client. We highly recommend enabling this in production.
     * If you throw `EnvelopError`/`GraphQLError` within your GraphQL resolvers then that error will be sent back to the client.
     *
     * You can lean more about this here:
     * @see https://graphql-yoga.vercel.app/docs/features/error-masking
     *
     * @default true
     */
    maskedErrors?: boolean | Partial<YogaMaskedErrorOpts>;
    /**
     * Context
     */
    context?: ((initialContext: YogaInitialContext & TServerContext) => Promise<TUserContext> | TUserContext) | Promise<TUserContext> | TUserContext;
    cors?: Parameters<typeof useCORS>[0];
    /**
     * GraphQL endpoint
     * So you need to define it explicitly if GraphQL API lives in a different path other than `/graphql`
     *
     * @default "/graphql"
     */
    graphqlEndpoint?: string;
    /**
     * Readiness check endpoint
     *
     * @default "/health"
     */
    healthCheckEndpoint?: string;
    /**
     * Whether the landing page should be shown.
     */
    landingPage?: boolean;
    /**
     * GraphiQL options
     *
     * @default true
     */
    graphiql?: GraphiQLOptionsOrFactory<TServerContext>;
    renderGraphiQL?: (options?: GraphiQLOptions) => PromiseOrValue<BodyInit>;
    schema?: YogaSchemaDefinition<TUserContext & TServerContext>;
    /**
     * Envelop Plugins
     * @see https://envelop.dev/plugins
     */
    plugins?: Array<Plugin<TUserContext & TServerContext & YogaInitialContext> | Plugin | {}>;
    parserCache?: boolean | ParserAndValidationCacheOptions;
    validationCache?: boolean | ValidationCache;
    fetchAPI?: Partial<Record<keyof FetchAPI, any>>;
    /**
     * GraphQL Multipart Request spec support
     *
     * @see https://github.com/jaydenseric/graphql-multipart-request-spec
     *
     * @default true
     */
    multipart?: boolean;
    id?: string;
    /**
     * Batching RFC Support configuration
     *
     * @see https://github.com/graphql/graphql-over-http/blob/main/rfcs/Batching.md
     *
     * @default false
     */
    batching?: BatchingOptions;
    /**
     * Whether to use the legacy Yoga Server-Sent Events and not
     * the GraphQL over SSE spec's distinct connection mode.
     *
     * @default true
     *
     * @deprecated Consider using GraphQL over SSE spec instead by setting this to `false`. Starting with the next major release, this flag will default to `false`.
     */
    legacySse?: boolean;
};
export type BatchingOptions = boolean | {
    /**
     * You can limit the number of batched operations per request.
     *
     * @default 10
     */
    limit?: number;
};
/**
 * Base class that can be extended to create a GraphQL server with any HTTP server framework.
 * @internal
 */
export declare class YogaServer<TServerContext extends Record<string, any>, TUserContext extends Record<string, any>> implements ServerAdapterBaseObject<TServerContext> {
    /**
     * Instance of envelop
     */
    readonly getEnveloped: GetEnvelopedFn<TUserContext & TServerContext & YogaInitialContext>;
    logger: YogaLogger;
    readonly graphqlEndpoint: string;
    fetchAPI: FetchAPI;
    protected plugins: Array<Plugin<TUserContext & TServerContext & YogaInitialContext, TServerContext>>;
    private onRequestParseHooks;
    private onParamsHooks;
    private onResultProcessHooks;
    private maskedErrorsOpts;
    private id;
    constructor(options?: YogaServerOptions<TServerContext, TUserContext>);
    getResultForParams({ params, request, }: {
        params: GraphQLParams;
        request: Request;
    }, ...args: {} extends TServerContext ? [serverContext?: TServerContext | undefined] : [serverContext: TServerContext]): Promise<ExecutionResult<import("graphql/jsutils/ObjMap.js").ObjMap<unknown>, import("graphql/jsutils/ObjMap.js").ObjMap<unknown>> | undefined>;
    handle: ServerAdapterRequestHandler<TServerContext>;
}
export type YogaServerInstance<TServerContext extends Record<string, any>, TUserContext extends Record<string, any>> = ServerAdapter<TServerContext, YogaServer<TServerContext, TUserContext>>;
export declare function createYoga<TServerContext extends Record<string, any> = {}, TUserContext extends Record<string, any> = {}>(options: YogaServerOptions<TServerContext, TUserContext>): YogaServerInstance<TServerContext, TUserContext>;
