import type { IValueState } from './contracts';
export declare class ValueState<TValue> implements IValueState<TValue> {
    private constructor();
    value?: TValue | null;
    loading?: boolean | null;
    hasValue?: boolean | null;
    error?: any;
    hasError?: boolean | null;
}
