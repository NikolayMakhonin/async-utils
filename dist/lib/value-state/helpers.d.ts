import { ValueState } from './ValueState';
import { AsyncOrValue, IValueState, OfValueStateOrValues, Updater } from './contracts';
export declare function createValueState<TValue>(props?: IValueState<TValue>): ValueState<TValue>;
export declare function toValueState<TValue>(value: TValue): ValueState<TValue>;
export declare function toValueStateError<TValue = any>(error: any): ValueState<TValue>;
export declare function resolveValueStatesFunc<TValues extends ValueState<any>[], TResult>(values: TValues, func: (...values: OfValueStateOrValues<TValues>) => TResult): ValueState<TResult>;
export declare function asyncToValueState<TValue>(valueAsync: AsyncOrValue<TValue>, stateOrUpdater?: ValueState<TValue> | Updater<ValueState<TValue>>): Promise<ValueState<TValue>>;
