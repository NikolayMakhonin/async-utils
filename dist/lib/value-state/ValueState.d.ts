import type { IValueState } from './contracts';
export declare class ValueState<TValue> implements IValueState<TValue> {
    private constructor();
    value?: TValue;
    loading?: boolean;
    hasValue?: boolean;
    error?: any;
    hasError?: boolean;
}
