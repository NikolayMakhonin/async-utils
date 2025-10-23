import { type IAbortSignalFast } from '@flemist/abort-controller-fast';
export declare function funcToAbortable<T>(abortSignal: IAbortSignalFast | null | undefined, func: (abortPromise?: Promise<any>) => Promise<T> | T): Promise<T>;
