import {PromiseOrValue} from 'src/types'

export interface IValueState<TValue> {
  value?: TValue|null
  loading?: boolean|null
  hasValue?: boolean|null
  error?: any
  hasError?: boolean|null
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
export type Updater<T> = (updater: (value: T) => T) => void

