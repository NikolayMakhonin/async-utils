import { PromiseLikeOrValue } from "../types";
export declare function promiseFinally<TPromise extends PromiseLike<any>>(promise: TPromise, onFinally: (() => PromiseLikeOrValue<void>) | null | undefined): TPromise;
