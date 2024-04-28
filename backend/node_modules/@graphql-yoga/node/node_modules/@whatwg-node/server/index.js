'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const DefaultFetchAPI = require('@whatwg-node/fetch');

function isAsyncIterable(body) {
    return (body != null && typeof body === 'object' && typeof body[Symbol.asyncIterator] === 'function');
}
function getPort(nodeRequest) {
    var _a, _b, _c, _d, _e;
    if ((_a = nodeRequest.socket) === null || _a === void 0 ? void 0 : _a.localPort) {
        return (_b = nodeRequest.socket) === null || _b === void 0 ? void 0 : _b.localPort;
    }
    const hostInHeader = ((_c = nodeRequest.headers) === null || _c === void 0 ? void 0 : _c[':authority']) || ((_d = nodeRequest.headers) === null || _d === void 0 ? void 0 : _d.host);
    const portInHeader = (_e = hostInHeader === null || hostInHeader === void 0 ? void 0 : hostInHeader.split(':')) === null || _e === void 0 ? void 0 : _e[1];
    if (portInHeader) {
        return portInHeader;
    }
    return 80;
}
function getHostnameWithPort(nodeRequest) {
    var _a, _b, _c, _d, _e;
    if ((_a = nodeRequest.headers) === null || _a === void 0 ? void 0 : _a[':authority']) {
        return (_b = nodeRequest.headers) === null || _b === void 0 ? void 0 : _b[':authority'];
    }
    if ((_c = nodeRequest.headers) === null || _c === void 0 ? void 0 : _c.host) {
        return (_d = nodeRequest.headers) === null || _d === void 0 ? void 0 : _d.host;
    }
    const port = getPort(nodeRequest);
    if (nodeRequest.hostname) {
        return nodeRequest.hostname + ':' + port;
    }
    const localIp = (_e = nodeRequest.socket) === null || _e === void 0 ? void 0 : _e.localAddress;
    if (localIp && !(localIp === null || localIp === void 0 ? void 0 : localIp.includes('::')) && !(localIp === null || localIp === void 0 ? void 0 : localIp.includes('ffff'))) {
        return `${localIp}:${port}`;
    }
    return 'localhost';
}
function buildFullUrl(nodeRequest) {
    const hostnameWithPort = getHostnameWithPort(nodeRequest);
    const protocol = nodeRequest.protocol || 'http';
    const endpoint = nodeRequest.originalUrl || nodeRequest.url || '/graphql';
    return `${protocol}://${hostnameWithPort}${endpoint}`;
}
function isRequestBody(body) {
    const stringTag = body[Symbol.toStringTag];
    if (typeof body === 'string' ||
        stringTag === 'Uint8Array' ||
        stringTag === 'Blob' ||
        stringTag === 'FormData' ||
        stringTag === 'URLSearchParams' ||
        isAsyncIterable(body)) {
        return true;
    }
    return false;
}
function normalizeNodeRequest(nodeRequest, RequestCtor) {
    var _a;
    const rawRequest = nodeRequest.raw || nodeRequest.req || nodeRequest;
    let fullUrl = buildFullUrl(rawRequest);
    if (nodeRequest.query) {
        const url = new DefaultFetchAPI.URL(fullUrl);
        for (const key in nodeRequest.query) {
            url.searchParams.set(key, nodeRequest.query[key]);
        }
        fullUrl = url.toString();
    }
    if (nodeRequest.method === 'GET' || nodeRequest.method === 'HEAD') {
        return new RequestCtor(fullUrl, {
            method: nodeRequest.method,
            headers: nodeRequest.headers,
        });
    }
    /**
     * Some Node server frameworks like Serverless Express sends a dummy object with body but as a Buffer not string
     * so we do those checks to see is there something we can use directly as BodyInit
     * because the presence of body means the request stream is already consumed and,
     * rawRequest cannot be used as BodyInit/ReadableStream by Fetch API in this case.
     */
    const maybeParsedBody = nodeRequest.body;
    if (maybeParsedBody != null && Object.keys(maybeParsedBody).length > 0) {
        if (isRequestBody(maybeParsedBody)) {
            return new RequestCtor(fullUrl, {
                method: nodeRequest.method,
                headers: nodeRequest.headers,
                body: maybeParsedBody,
            });
        }
        const request = new RequestCtor(fullUrl, {
            method: nodeRequest.method,
            headers: nodeRequest.headers,
        });
        if (!((_a = request.headers.get('content-type')) === null || _a === void 0 ? void 0 : _a.includes('json'))) {
            request.headers.set('content-type', 'application/json');
        }
        return new Proxy(request, {
            get: (target, prop, receiver) => {
                switch (prop) {
                    case 'json':
                        return async () => maybeParsedBody;
                    case 'text':
                        return async () => JSON.stringify(maybeParsedBody);
                    default:
                        return Reflect.get(target, prop, receiver);
                }
            },
        });
    }
    // perf: instead of spreading the object, we can just pass it as is and it performs better
    return new RequestCtor(fullUrl, {
        method: nodeRequest.method,
        headers: nodeRequest.headers,
        body: rawRequest,
    });
}
function isReadable(stream) {
    return stream.read != null;
}
function isNodeRequest(request) {
    return isReadable(request);
}
function isServerResponse(stream) {
    // Check all used functions are defined
    return (stream != null &&
        stream.setHeader != null &&
        stream.end != null &&
        stream.once != null &&
        stream.write != null);
}
function isReadableStream(stream) {
    return stream != null && stream.getReader != null;
}
function isFetchEvent(event) {
    return event != null && event.request != null && event.respondWith != null;
}
function configureSocket(rawRequest) {
    var _a, _b, _c, _d, _e, _f;
    (_b = (_a = rawRequest === null || rawRequest === void 0 ? void 0 : rawRequest.socket) === null || _a === void 0 ? void 0 : _a.setTimeout) === null || _b === void 0 ? void 0 : _b.call(_a, 0);
    (_d = (_c = rawRequest === null || rawRequest === void 0 ? void 0 : rawRequest.socket) === null || _c === void 0 ? void 0 : _c.setNoDelay) === null || _d === void 0 ? void 0 : _d.call(_c, true);
    (_f = (_e = rawRequest === null || rawRequest === void 0 ? void 0 : rawRequest.socket) === null || _e === void 0 ? void 0 : _e.setKeepAlive) === null || _f === void 0 ? void 0 : _f.call(_e, true);
}
function endResponse(serverResponse) {
    // @ts-expect-error Avoid arguments adaptor trampoline https://v8.dev/blog/adaptor-frame
    serverResponse.end(null, null, null);
}
function getHeadersObj(headers) {
    return new Proxy({}, {
        get(_target, prop) {
            return headers.get(prop) || undefined;
        },
        set(_target, prop, value) {
            headers.set(prop, value);
            return true;
        },
        has(_target, prop) {
            return headers.has(prop);
        },
        deleteProperty(_target, prop) {
            headers.delete(prop);
            return true;
        },
        ownKeys() {
            const keys = [];
            headers.forEach((_, key) => keys.push(key));
            return keys;
        },
        getOwnPropertyDescriptor() {
            return {
                enumerable: true,
                configurable: true,
            };
        },
    });
}
async function sendNodeResponse(fetchResponse, serverResponse, nodeRequest) {
    const headersObj = getHeadersObj(fetchResponse.headers);
    serverResponse.writeHead(fetchResponse.status, fetchResponse.statusText, headersObj);
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
        serverResponse.once('close', resolve);
        // Our Node-fetch enhancements
        if ('bodyType' in fetchResponse &&
            fetchResponse.bodyType != null &&
            (fetchResponse.bodyType === 'String' || fetchResponse.bodyType === 'Uint8Array')) {
            // @ts-expect-error http and http2 writes are actually compatible
            serverResponse.write(fetchResponse.bodyInit);
            endResponse(serverResponse);
            return;
        }
        // Other fetch implementations
        const fetchBody = fetchResponse.body;
        if (fetchBody == null) {
            endResponse(serverResponse);
            return;
        }
        if (fetchBody[Symbol.toStringTag] === 'Uint8Array') {
            serverResponse
                // @ts-expect-error http and http2 writes are actually compatible
                .write(fetchBody);
            endResponse(serverResponse);
            return;
        }
        configureSocket(nodeRequest);
        if (isReadable(fetchBody)) {
            serverResponse.once('close', () => {
                fetchBody.destroy();
            });
            fetchBody.pipe(serverResponse);
            return;
        }
        if (isAsyncIterable(fetchBody)) {
            for await (const chunk of fetchBody) {
                if (!serverResponse
                    // @ts-expect-error http and http2 writes are actually compatible
                    .write(chunk)) {
                    break;
                }
            }
            endResponse(serverResponse);
        }
    });
}
function isRequestInit(val) {
    return (val != null &&
        typeof val === 'object' &&
        ('body' in val ||
            'cache' in val ||
            'credentials' in val ||
            'headers' in val ||
            'integrity' in val ||
            'keepalive' in val ||
            'method' in val ||
            'mode' in val ||
            'redirect' in val ||
            'referrer' in val ||
            'referrerPolicy' in val ||
            'signal' in val ||
            'window' in val));
}

/* eslint-disable @typescript-eslint/ban-types */
async function handleWaitUntils(waitUntilPromises) {
    const waitUntils = await Promise.allSettled(waitUntilPromises);
    waitUntils.forEach(waitUntil => {
        if (waitUntil.status === 'rejected') {
            console.error(waitUntil.reason);
        }
    });
}
// Required for envs like nextjs edge runtime
function isRequestAccessible(serverContext) {
    try {
        return !!(serverContext === null || serverContext === void 0 ? void 0 : serverContext.request);
    }
    catch (_a) {
        return false;
    }
}
function createServerAdapter(serverAdapterBaseObject, options) {
    const fetchAPI = {
        ...DefaultFetchAPI,
        ...options === null || options === void 0 ? void 0 : options.fetchAPI,
    };
    const givenHandleRequest = typeof serverAdapterBaseObject === 'function'
        ? serverAdapterBaseObject
        : serverAdapterBaseObject.handle;
    const onRequestHooks = [];
    const onResponseHooks = [];
    if ((options === null || options === void 0 ? void 0 : options.plugins) != null) {
        for (const plugin of options.plugins) {
            if (plugin.onRequest) {
                onRequestHooks.push(plugin.onRequest);
            }
            if (plugin.onResponse) {
                onResponseHooks.push(plugin.onResponse);
            }
        }
    }
    async function handleRequest(request, serverContext) {
        let url = new Proxy({}, {
            get: (_target, prop, _receiver) => {
                url = new fetchAPI.URL(request.url, 'http://localhost');
                return Reflect.get(url, prop, url);
            },
        });
        let requestHandler = givenHandleRequest;
        let response;
        for (const onRequestHook of onRequestHooks) {
            await onRequestHook({
                request,
                serverContext,
                fetchAPI,
                url,
                requestHandler,
                setRequestHandler(newRequestHandler) {
                    requestHandler = newRequestHandler;
                },
                endResponse(newResponse) {
                    response = newResponse;
                },
            });
            if (response) {
                break;
            }
        }
        if (!response) {
            response = await requestHandler(request, serverContext);
        }
        for (const onResponseHook of onResponseHooks) {
            await onResponseHook({
                request,
                response,
                serverContext,
            });
        }
        return response;
    }
    function handleNodeRequest(nodeRequest, ...ctx) {
        const serverContext = ctx.length > 1 ? completeAssign({}, ...ctx) : ctx[0];
        const request = normalizeNodeRequest(nodeRequest, fetchAPI.Request);
        return handleRequest(request, serverContext);
    }
    async function requestListener(nodeRequest, serverResponse, ...ctx) {
        const waitUntilPromises = [];
        const defaultServerContext = {
            req: nodeRequest,
            res: serverResponse,
            waitUntil(promise) {
                if (promise != null) {
                    waitUntilPromises.push(promise);
                }
            },
        };
        const response = await handleNodeRequest(nodeRequest, defaultServerContext, ...ctx);
        if (response) {
            await sendNodeResponse(response, serverResponse, nodeRequest);
        }
        else {
            await new Promise(resolve => {
                serverResponse.statusCode = 404;
                serverResponse.once('end', resolve);
                serverResponse.end();
            });
        }
        if (waitUntilPromises.length > 0) {
            await handleWaitUntils(waitUntilPromises);
        }
    }
    function handleEvent(event, ...ctx) {
        if (!event.respondWith || !event.request) {
            throw new TypeError(`Expected FetchEvent, got ${event}`);
        }
        const serverContext = ctx.length > 0 ? Object.assign({}, event, ...ctx) : event;
        const response$ = handleRequest(event.request, serverContext);
        event.respondWith(response$);
    }
    function handleRequestWithWaitUntil(request, ...ctx) {
        const serverContext = ctx.length > 1 ? completeAssign({}, ...ctx) : ctx[0] || {};
        if (!('waitUntil' in serverContext)) {
            const waitUntilPromises = [];
            const response$ = handleRequest(request, {
                ...serverContext,
                waitUntil(promise) {
                    if (promise != null) {
                        waitUntilPromises.push(promise);
                    }
                },
            });
            if (waitUntilPromises.length > 0) {
                return handleWaitUntils(waitUntilPromises).then(() => response$);
            }
            return response$;
        }
        return handleRequest(request, serverContext);
    }
    const fetchFn = (input, ...maybeCtx) => {
        if (typeof input === 'string' || 'href' in input) {
            const [initOrCtx, ...restOfCtx] = maybeCtx;
            if (isRequestInit(initOrCtx)) {
                return handleRequestWithWaitUntil(new fetchAPI.Request(input, initOrCtx), ...restOfCtx);
            }
            return handleRequestWithWaitUntil(new fetchAPI.Request(input), ...maybeCtx);
        }
        return handleRequestWithWaitUntil(input, ...maybeCtx);
    };
    const genericRequestHandler = (input, ...maybeCtx) => {
        // If it is a Node request
        const [initOrCtxOrRes, ...restOfCtx] = maybeCtx;
        if (isNodeRequest(input)) {
            if (!isServerResponse(initOrCtxOrRes)) {
                throw new TypeError(`Expected ServerResponse, got ${initOrCtxOrRes}`);
            }
            return requestListener(input, initOrCtxOrRes, ...restOfCtx);
        }
        if (isServerResponse(initOrCtxOrRes)) {
            throw new TypeError('Got Node response without Node request');
        }
        // Is input a container object over Request?
        if (isRequestAccessible(input)) {
            // Is it FetchEvent?
            if (isFetchEvent(input)) {
                return handleEvent(input, ...maybeCtx);
            }
            // In this input is also the context
            return handleRequestWithWaitUntil(input.request, input, ...maybeCtx);
        }
        // Or is it Request itself?
        // Then ctx is present and it is the context
        return fetchFn(input, ...maybeCtx);
    };
    const adapterObj = {
        handleRequest,
        fetch: fetchFn,
        handleNodeRequest,
        requestListener,
        handleEvent,
        handle: genericRequestHandler,
    };
    const serverAdapter = new Proxy(genericRequestHandler, {
        // It should have all the attributes of the handler function and the server instance
        has: (_, prop) => {
            return (prop in adapterObj ||
                prop in genericRequestHandler ||
                (serverAdapterBaseObject && prop in serverAdapterBaseObject));
        },
        get: (_, prop) => {
            const adapterProp = adapterObj[prop];
            if (adapterProp) {
                if (adapterProp.bind) {
                    return adapterProp.bind(adapterObj);
                }
                return adapterProp;
            }
            const handleProp = genericRequestHandler[prop];
            if (handleProp) {
                if (handleProp.bind) {
                    return handleProp.bind(genericRequestHandler);
                }
                return handleProp;
            }
            if (serverAdapterBaseObject) {
                const serverAdapterBaseObjectProp = serverAdapterBaseObject[prop];
                if (serverAdapterBaseObjectProp) {
                    if (serverAdapterBaseObjectProp.bind) {
                        return function (...args) {
                            const returnedVal = serverAdapterBaseObject[prop](...args);
                            if (returnedVal === serverAdapterBaseObject) {
                                return serverAdapter;
                            }
                            return returnedVal;
                        };
                    }
                    return serverAdapterBaseObjectProp;
                }
            }
        },
        apply(_, __, args) {
            return genericRequestHandler(...args);
        },
    });
    return serverAdapter;
}
// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#copying_accessors
function completeAssign(target, ...sources) {
    sources.forEach(source => {
        if (source != null && typeof source === 'object') {
            // modified Object.keys to Object.getOwnPropertyNames
            // because Object.keys only returns enumerable properties
            const descriptors = Object.getOwnPropertyNames(source).reduce((descriptors, key) => {
                descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
                return descriptors;
            }, {});
            // By default, Object.assign copies enumerable Symbols, too
            Object.getOwnPropertySymbols(source).forEach(sym => {
                const descriptor = Object.getOwnPropertyDescriptor(source, sym);
                if (descriptor.enumerable) {
                    descriptors[sym] = descriptor;
                }
            });
            Object.defineProperties(target, descriptors);
        }
    });
    return target;
}

function getCORSHeadersByRequestAndOptions(request, corsOptions) {
    var _a, _b;
    const currentOrigin = request.headers.get('origin');
    if (corsOptions === false || currentOrigin == null) {
        return null;
    }
    const headers = {};
    // If defined origins have '*' or undefined by any means, we should allow all origins
    if (corsOptions.origin == null ||
        corsOptions.origin.length === 0 ||
        corsOptions.origin.includes('*')) {
        headers['Access-Control-Allow-Origin'] = currentOrigin;
        // Vary by origin because there are multiple origins
        headers['Vary'] = 'Origin';
    }
    else if (typeof corsOptions.origin === 'string') {
        // If there is one specific origin is specified, use it directly
        headers['Access-Control-Allow-Origin'] = corsOptions.origin;
    }
    else if (Array.isArray(corsOptions.origin)) {
        // If there is only one origin defined in the array, consider it as a single one
        if (corsOptions.origin.length === 1) {
            headers['Access-Control-Allow-Origin'] = corsOptions.origin[0];
        }
        else if (corsOptions.origin.includes(currentOrigin)) {
            // If origin is available in the headers, use it
            headers['Access-Control-Allow-Origin'] = currentOrigin;
            // Vary by origin because there are multiple origins
            headers['Vary'] = 'Origin';
        }
        else {
            // There is no origin found in the headers, so we should return null
            headers['Access-Control-Allow-Origin'] = 'null';
        }
    }
    if ((_a = corsOptions.methods) === null || _a === void 0 ? void 0 : _a.length) {
        headers['Access-Control-Allow-Methods'] = corsOptions.methods.join(', ');
    }
    else {
        const requestMethod = request.headers.get('access-control-request-method');
        if (requestMethod) {
            headers['Access-Control-Allow-Methods'] = requestMethod;
        }
    }
    if ((_b = corsOptions.allowedHeaders) === null || _b === void 0 ? void 0 : _b.length) {
        headers['Access-Control-Allow-Headers'] = corsOptions.allowedHeaders.join(', ');
    }
    else {
        const requestHeaders = request.headers.get('access-control-request-headers');
        if (requestHeaders) {
            headers['Access-Control-Allow-Headers'] = requestHeaders;
            if (headers['Vary']) {
                headers['Vary'] += ', Access-Control-Request-Headers';
            }
            headers['Vary'] = 'Access-Control-Request-Headers';
        }
    }
    if (corsOptions.credentials != null) {
        if (corsOptions.credentials === true) {
            headers['Access-Control-Allow-Credentials'] = 'true';
        }
    }
    else if (headers['Access-Control-Allow-Origin'] !== '*') {
        headers['Access-Control-Allow-Credentials'] = 'true';
    }
    if (corsOptions.exposedHeaders) {
        headers['Access-Control-Expose-Headers'] = corsOptions.exposedHeaders.join(', ');
    }
    if (corsOptions.maxAge) {
        headers['Access-Control-Max-Age'] = corsOptions.maxAge.toString();
    }
    return headers;
}
async function getCORSResponseHeaders(request, corsOptionsFactory, serverContext) {
    const corsOptions = await corsOptionsFactory(request, serverContext);
    return getCORSHeadersByRequestAndOptions(request, corsOptions);
}
function useCORS(options) {
    let corsOptionsFactory = () => ({});
    if (options != null) {
        if (typeof options === 'function') {
            corsOptionsFactory = options;
        }
        else if (typeof options === 'object') {
            const corsOptions = {
                ...options,
            };
            corsOptionsFactory = () => corsOptions;
        }
        else if (options === false) {
            corsOptionsFactory = () => false;
        }
    }
    return {
        onRequest({ request, fetchAPI, endResponse }) {
            if (request.method.toUpperCase() === 'OPTIONS') {
                const response = new fetchAPI.Response(null, {
                    status: 204,
                    // Safari (and potentially other browsers) need content-length 0,
                    // for 204 or they just hang waiting for a body
                    // see: https://github.com/expressjs/cors/blob/master/lib/index.js#L176
                    headers: {
                        'Content-Length': '0',
                    },
                });
                endResponse(response);
            }
        },
        async onResponse({ request, serverContext, response }) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const headers = await getCORSResponseHeaders(request, corsOptionsFactory, serverContext);
            if (headers != null) {
                for (const headerName in headers) {
                    response.headers.set(headerName, headers[headerName]);
                }
            }
        },
    };
}

function createDefaultErrorHandler(ResponseCtor = DefaultFetchAPI.Response) {
    return function defaultErrorHandler(e) {
        return new ResponseCtor(typeof e.details === 'object'
            ? JSON.stringify(e.details)
            : e.stack || e.message || e.toString(), {
            status: e.statusCode || e.status || 500,
            headers: e.headers || {},
        });
    };
}
class HTTPError extends Error {
    constructor(status, message, headers = {}, details) {
        super(message);
        this.status = status;
        this.message = message;
        this.headers = headers;
        this.details = details;
        Error.captureStackTrace(this, HTTPError);
    }
}
function useErrorHandling(onError) {
    return {
        onRequest({ requestHandler, setRequestHandler, fetchAPI }) {
            const errorHandler = onError || createDefaultErrorHandler(fetchAPI.Response);
            setRequestHandler(async function handlerWithErrorHandling(request, serverContext) {
                try {
                    const response = await requestHandler(request, serverContext);
                    return response;
                }
                catch (e) {
                    const response = await errorHandler(e, request, serverContext);
                    return response;
                }
            });
        },
    };
}

Object.defineProperty(exports, 'Response', {
    enumerable: true,
    get: function () {
        return DefaultFetchAPI.Response;
    }
});
exports.HTTPError = HTTPError;
exports.createDefaultErrorHandler = createDefaultErrorHandler;
exports.createServerAdapter = createServerAdapter;
exports.getCORSHeadersByRequestAndOptions = getCORSHeadersByRequestAndOptions;
exports.getHeadersObj = getHeadersObj;
exports.isAsyncIterable = isAsyncIterable;
exports.isFetchEvent = isFetchEvent;
exports.isNodeRequest = isNodeRequest;
exports.isReadable = isReadable;
exports.isReadableStream = isReadableStream;
exports.isRequestInit = isRequestInit;
exports.isServerResponse = isServerResponse;
exports.normalizeNodeRequest = normalizeNodeRequest;
exports.sendNodeResponse = sendNodeResponse;
exports.useCORS = useCORS;
exports.useErrorHandling = useErrorHandling;
