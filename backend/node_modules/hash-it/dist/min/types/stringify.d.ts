interface RecursiveState {
    cache: WeakMap<any, number>;
    id: number;
}
export declare function stringifyArray(value: any[], state: RecursiveState): string;
export declare function stringifyArrayBufferModern(buffer: ArrayBufferLike): string;
export declare function stringifyArrayBufferFallback(buffer: ArrayBufferLike): string;
export declare function stringifyArrayBufferNone(): string;
export declare function stringifyDocumentFragment(fragment: DocumentFragment): string;
export declare function stringifyMap(map: Map<any, any>, state: RecursiveState): string;
export declare function stringifyObject(value: Record<string, any>, state: RecursiveState): string;
export declare function stringifySet(set: Set<any>, state: RecursiveState): string;
export declare function stringify(value: any, state: RecursiveState | undefined): string;
export {};
