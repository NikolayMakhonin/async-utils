import { type IAbortSignalFast } from '@flemist/abort-controller-fast';
import { PromiseOrValue } from "../types";
export declare type AbortSignalToPromiseOptions = {
    dontThrow?: null | boolean;
};
export declare function abortSignalToPromise(abortSignal: IAbortSignalFast | null | undefined, options?: null | AbortSignalToPromiseOptions): PromiseOrValue<void>;
export declare function promiseToAbortSignal(promise: PromiseLike<any>): IAbortSignalFast;
