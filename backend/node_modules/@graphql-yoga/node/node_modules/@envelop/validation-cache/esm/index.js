import { print, introspectionFromSchema } from 'graphql';
import LRU from 'lru-cache';
import hashIt from 'hash-it';
const DEFAULT_MAX = 1000;
const DEFAULT_TTL = 3600000;
const rawDocumentSymbol = Symbol('rawDocument');
const schemaHashCache = new WeakMap();
function getSchemaHash(schema) {
    let hash = schemaHashCache.get(schema);
    if (hash) {
        return hash;
    }
    const introspection = introspectionFromSchema(schema);
    hash = String(hashIt(introspection.__schema));
    schemaHashCache.set(schema, hash);
    return hash;
}
export const useValidationCache = (pluginOptions = {}) => {
    const resultCache = typeof pluginOptions.cache !== 'undefined'
        ? pluginOptions.cache
        : new LRU({
            max: DEFAULT_MAX,
            maxAge: DEFAULT_TTL,
        });
    return {
        onParse({ params, extendContext }) {
            extendContext({ [rawDocumentSymbol]: params.source.toString() });
        },
        onValidate({ params, context, setValidationFn, validateFn }) {
            // We use setValidateFn over accessing params.rules directly, as other plugins in the chain might add more rules.
            // This would cause an issue if we are constructing the cache key here already.
            setValidationFn((...args) => {
                const schemaHashKey = getSchemaHash(args[0]);
                let ruleKey = '';
                if (Array.isArray(args[2])) {
                    // Note: We could also order them... but that might be too much
                    for (const rule of args[2]) {
                        ruleKey = ruleKey + rule.name;
                    }
                }
                const key = schemaHashKey + `|` + ruleKey + `|` + (context[rawDocumentSymbol] ?? print(params.documentAST));
                const cachedResult = resultCache.get(key);
                if (cachedResult !== undefined) {
                    return cachedResult;
                }
                const result = validateFn(...args);
                resultCache.set(key, result);
                return result;
            });
        },
    };
};
