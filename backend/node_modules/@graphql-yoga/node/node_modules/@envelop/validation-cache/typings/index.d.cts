import { Plugin } from '@envelop/core';
import { GraphQLError } from 'graphql';
export interface ValidationCache {
    /**
     * Get a result from the validation cache.
     */
    get(key: string): readonly GraphQLError[] | undefined;
    /**
     * Set a result to the validation cache.
     */
    set(key: string, value: readonly GraphQLError[]): void;
}
export declare type ValidationCacheOptions = {
    cache?: ValidationCache;
};
export declare const useValidationCache: (pluginOptions?: ValidationCacheOptions) => Plugin;
