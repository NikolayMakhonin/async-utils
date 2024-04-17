import { PromiseLikeOrValue } from "../promise-fast/PromiseFast";
export declare function promiseFinally<TPromise extends PromiseLike<any>>(promise: TPromise, onFinally: (() => PromiseLikeOrValue<void>) | null | undefined): TPromise;
