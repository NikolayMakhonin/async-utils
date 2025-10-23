import { type IAbortSignalFast } from '@flemist/abort-controller-fast';
import { PromiseOrValue } from "../types";
export declare function abortSignalToPromise(abortSignal: IAbortSignalFast | null | undefined): PromiseOrValue<void>;
export declare function promiseToAbortSignal(promise: PromiseLike<any>): IAbortSignalFast;
