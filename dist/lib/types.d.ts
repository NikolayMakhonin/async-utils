export declare type PromiseOrValue<T> = Promise<T> | T;
export declare type OfPromise<T> = T extends Promise<infer U> ? U : T;
export declare type ToPromise<T> = Promise<T extends Promise<infer U> ? U : T>;
export declare type Func<This, Args extends any[], Result> = (this: This, ...args: Args) => Result;
export declare type FuncAny = Func<any, any[], any>;
