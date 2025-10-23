import { type IAbortSignalFast } from '@flemist/abort-controller-fast';
export declare function promiseToAbortable<T>(abortSignal: IAbortSignalFast | null | undefined, promise: Promise<T>): Promise<T>;
