import {PromiseOrValue} from 'src/types'

export interface IValueState<TValue> {
  value?: TValue
  loading?: boolean
  hasValue?: boolean
  error?: any
  hasError?: boolean
}

export type ValueStateOrValue<T> = IValueState<T> | T
export type FuncOrValue<TValue> = (() => TValue) | TValue
export type StateOrValue<TValue> = IValueState<TValue> | TValue
export type AsyncOrValue<TValue> = FuncOrValue<PromiseOrValue<StateOrValue<TValue>>>
export type OfValueStateOrValue<T> = T extends ValueStateOrValue<infer U>
  ? U
  : never
export type OfValueStateOrValues<T> = {
  [K in keyof T]: OfValueStateOrValue<T[K]>;
}
