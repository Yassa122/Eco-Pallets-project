import type { Class } from './constants';
export declare const NON_ENUMERABLE_CLASS_CACHE: WeakMap<NonEnumerableObject, string>;
type NonEnumerableObject = Generator<any, any, any> | Promise<any> | WeakMap<any, any> | WeakSet<any>;
export declare function getUnsupportedHash(value: NonEnumerableObject, classType: Class): string;
export {};
