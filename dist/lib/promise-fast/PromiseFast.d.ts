export declare type PromiseLikeOrValue<TValue> = PromiseLike<TValue> | TValue;
export declare type OnFulfilled<TValue, TResult = any> = (value: TValue) => PromiseLikeOrValue<TResult>;
export declare type OnRejected<TResult> = (reason: any) => PromiseLikeOrValue<TResult>;
export declare type Resolve<TValue> = (value: PromiseLikeOrValue<TValue>) => void;
export declare type Reject = (reason?: any) => void;
export declare type Executor<TValue> = (resolve: Resolve<TValue>, reject: Reject) => void;
export declare type Status = 'pending' | 'fulfilled' | 'rejected';
export declare class PromiseFast<TValue> implements PromiseLike<TValue> {
    readonly status: Status;
    readonly value: TValue;
    readonly reason: any;
    private _handlers;
    constructor(executor?: Executor<TValue>);
    resolve(value: PromiseLikeOrValue<TValue>): void;
    private _resolveAsync;
    private _resolve;
    reject(reason: PromiseLikeOrValue<any>): void;
    private _rejectAsync;
    private _reject;
    then<TResult1 = TValue, TResult2 = never>(onfulfilled?: OnFulfilled<TValue, TResult1> | undefined | null, onrejected?: OnFulfilled<TValue, TResult2> | undefined | null): PromiseLike<TResult1 | TResult2>;
    catch<TResult2 = any>(onrejected?: OnFulfilled<TValue, TResult2> | undefined | null): PromiseLike<TResult2>;
    static resolve<TValue>(value: PromiseLikeOrValue<TValue>): PromiseFast<TValue>;
    static reject(reason: PromiseLikeOrValue<any>): PromiseFast<never>;
}
