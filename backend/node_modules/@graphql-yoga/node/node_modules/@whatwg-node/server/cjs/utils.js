"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRequestInit = exports.sendNodeResponse = exports.getHeadersObj = exports.isFetchEvent = exports.isReadableStream = exports.isServerResponse = exports.isNodeRequest = exports.isReadable = exports.normalizeNodeRequest = exports.isAsyncIterable = void 0;
const fetch_1 = require("@whatwg-node/fetch");
function isAsyncIterable(body) {
    return (body != null && typeof body === 'object' && typeof body[Symbol.asyncIterator] === 'function');
}
exports.isAsyncIterable = isAsyncIterable;
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
        const url = new fetch_1.URL(fullUrl);
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
exports.normalizeNodeRequest = normalizeNodeRequest;
function isReadable(stream) {
    return stream.read != null;
}
exports.isReadable = isReadable;
function isNodeRequest(request) {
    return isReadable(request);
}
exports.isNodeRequest = isNodeRequest;
function isServerResponse(stream) {
    // Check all used functions are defined
    return (stream != null &&
        stream.setHeader != null &&
        stream.end != null &&
        stream.once != null &&
        stream.write != null);
}
exports.isServerResponse = isServerResponse;
function isReadableStream(stream) {
    return stream != null && stream.getReader != null;
}
exports.isReadableStream = isReadableStream;
function isFetchEvent(event) {
    return event != null && event.request != null && event.respondWith != null;
}
exports.isFetchEvent = isFetchEvent;
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
exports.getHeadersObj = getHeadersObj;
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
exports.sendNodeResponse = sendNodeResponse;
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
exports.isRequestInit = isRequestInit;
