import { isAsyncIterable } from '@envelop/core';
import { getMediaTypesForRequestInOrder, isMatchingMediaType, } from './resultProcessor/accept.js';
import { processMultipartResult } from './resultProcessor/multipart.js';
import { getSSEProcessor } from './resultProcessor/sse.js';
import { processRegularResult } from './resultProcessor/regular.js';
const multipart = {
    mediaTypes: ['multipart/mixed'],
    asyncIterables: true,
    processResult: processMultipartResult,
};
function getSSEProcessorConfig(opts) {
    return {
        mediaTypes: ['text/event-stream'],
        asyncIterables: true,
        processResult: getSSEProcessor(opts),
    };
}
const regular = {
    mediaTypes: ['application/graphql-response+json', 'application/json'],
    asyncIterables: false,
    processResult: processRegularResult,
};
export function useResultProcessors(opts) {
    const isSubscriptionRequestMap = new WeakMap();
    const sse = getSSEProcessorConfig(opts);
    const defaultList = [sse, multipart, regular];
    const subscriptionList = [multipart, sse, regular];
    return {
        onSubscribe({ args: { contextValue } }) {
            if (contextValue.request) {
                isSubscriptionRequestMap.set(contextValue.request, true);
            }
        },
        onResultProcess({ request, result, acceptableMediaTypes, setResultProcessor, }) {
            const isSubscriptionRequest = isSubscriptionRequestMap.get(request);
            const processorConfigList = isSubscriptionRequest
                ? subscriptionList
                : defaultList;
            const requestMediaTypes = getMediaTypesForRequestInOrder(request);
            const isAsyncIterableResult = isAsyncIterable(result);
            for (const resultProcessorConfig of processorConfigList) {
                for (const requestMediaType of requestMediaTypes) {
                    if (isAsyncIterableResult && !resultProcessorConfig.asyncIterables) {
                        continue;
                    }
                    for (const processorMediaType of resultProcessorConfig.mediaTypes) {
                        acceptableMediaTypes.push(processorMediaType);
                        if (isMatchingMediaType(processorMediaType, requestMediaType)) {
                            setResultProcessor(resultProcessorConfig.processResult, processorMediaType);
                        }
                    }
                }
            }
        },
    };
}
