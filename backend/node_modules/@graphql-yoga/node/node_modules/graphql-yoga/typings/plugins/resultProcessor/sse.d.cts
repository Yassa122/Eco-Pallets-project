import { ResultProcessor } from '../types.cjs';
export interface SSEProcessorOptions {
    legacySSE: boolean;
}
export declare function getSSEProcessor(opts: SSEProcessorOptions): ResultProcessor;
