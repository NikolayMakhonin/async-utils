import { IAbortSignalFast } from '@flemist/abort-controller-fast';
export declare function useAbortController<T>(func: (abortSignal: IAbortSignalFast) => T): T;
