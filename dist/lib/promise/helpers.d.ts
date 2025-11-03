import { PromiseConstructorBase } from "./contracts";
import { PromiseLikeOrValue, PromiseOrValue } from "../types";
export declare function promiseAll<T>(values: readonly (T | PromiseLike<T>)[], PromiseClass?: PromiseConstructorBase): Promise<T[]>;
export declare function promiseAllSettled<T>(values: readonly (T | PromiseLike<T>)[], PromiseClass?: PromiseConstructorBase): Promise<PromiseSettledResult<T>[]>;
export declare function promiseAny<T>(values: readonly (T | PromiseLike<T>)[], PromiseClass?: PromiseConstructorBase): Promise<T>;
export declare function promiseRace<T>(values: readonly (T | PromiseLike<T>)[], PromiseClass?: PromiseConstructorBase): Promise<T>;
export declare function promiseLikeToPromise<T>(value: PromiseLike<T> | Promise<T>): Promise<T>;
export declare function promiseLikeToPromise<T>(value: PromiseLikeOrValue<T> | PromiseOrValue<T>): PromiseOrValue<T>;
export declare function promiseLikeToPromise<T>(value: T): T;
