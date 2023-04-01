import { PromiseOrValue } from "../types";
export interface IValueState<TValue> {
    value?: TValue;
    loading?: boolean;
    hasValue?: boolean;
    error?: any;
    hasError?: boolean;
}
export declare type ValueStateOrValue<T> = IValueState<T> | T;
export declare type FuncOrValue<TValue> = (() => TValue) | TValue;
export declare type StateOrValue<TValue> = IValueState<TValue> | TValue;
export declare type AsyncOrValue<TValue> = FuncOrValue<PromiseOrValue<StateOrValue<TValue>>>;
export declare type OfValueStateOrValue<T> = T extends ValueStateOrValue<infer U> ? U : never;
export declare type OfValueStateOrValues<T> = {
    [K in keyof T]: OfValueStateOrValue<T[K]>;
};
