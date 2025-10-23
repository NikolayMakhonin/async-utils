import { PromiseOrValue } from "../types";
export declare type LockFunc = <T>(handler: () => PromiseOrValue<T>) => Promise<T>;
export interface ILocker {
    lock: LockFunc;
}
export declare class Locker {
    private _lockPromise;
    lock<T>(handler: () => PromiseOrValue<T>): Promise<T>;
}
