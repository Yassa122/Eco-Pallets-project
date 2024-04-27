import { ResultProcessor } from '../types.js';
export interface SSEProcessorOptions {
    legacySSE: boolean;
}
export declare function getSSEProcessor(opts: SSEProcessorOptions): ResultProcessor;
