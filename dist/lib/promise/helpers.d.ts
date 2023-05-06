import { PromiseConstructorBase } from "./contracts";
export declare function promiseAll<T>(values: readonly (T | PromiseLike<T>)[], PromiseClass?: PromiseConstructorBase): Promise<T[]>;
export declare function promiseAllSettled<T>(values: readonly (T | PromiseLike<T>)[], PromiseClass?: PromiseConstructorBase): Promise<PromiseSettledResult<T>[]>;
export declare function promiseAny<T>(values: readonly (T | PromiseLike<T>)[], PromiseClass?: PromiseConstructorBase): Promise<T>;
export declare function promiseRace<T>(values: readonly (T | PromiseLike<T>)[], PromiseClass?: PromiseConstructorBase): Promise<T>;
