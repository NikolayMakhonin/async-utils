import { PromiseOrValue } from "../types";
export interface IValueState<TValue> {
    value?: TValue | null;
    loading?: boolean | null;
    hasValue?: boolean | null;
    error?: any;
    hasError?: boolean | null;
}
export declare type ValueStateOrValue<T> = IValueState<T> | T;
export declare type FuncOrValue<TValue> = (() => TValue) | TValue;
export declare type StateOrValue<TValue> = IValueState<TValue> | TValue;
export declare type AsyncOrValue<TValue> = FuncOrValue<PromiseOrValue<StateOrValue<TValue>>>;
export declare type OfValueStateOrValue<T> = T extends ValueStateOrValue<infer U> ? U : never;
export declare type OfValueStateOrValues<T> = {
    [K in keyof T]: OfValueStateOrValue<T[K]>;
};
export declare type Updater<T> = (updater: (value: T) => T) => void;
