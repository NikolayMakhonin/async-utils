export type PromiseLikeOrValue<TValue> = PromiseLike<TValue> | TValue

export type PromiseOrValue<T> = Promise<T> | T

export type OfPromise<T> = T extends Promise<infer U> ? U : T

export type ToPromise<T> = Promise<T extends Promise<infer U> ? U : T>

export type Func<This, Args extends any[], Result>
  = (this: This, ...args: Args) => Result

export type FuncAny = Func<any, any[], any>
