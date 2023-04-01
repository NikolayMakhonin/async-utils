import {isPromiseLike} from 'src/isPromiseLike'
import { ValueState } from './ValueState'
import {
  AsyncOrValue,
  IValueState,
  OfValueStateOrValues,
  PromiseOrValue,
  StateOrValue,
} from './contracts'

export function createValueState<TValue>(
  props: IValueState<TValue> = {},
): ValueState<TValue> {
  return new (ValueState as any)(props)
}

export function toValueState<TValue>(value: TValue) {
  return createValueState({
    value,
    hasValue: true,
  })
}

export function toValueStateError<TValue = any>(error: any) {
  return createValueState<TValue>({
    error,
    hasError: true,
  })
}

function resolveValueStates<TValues extends ValueState<any>[]>(
  values: TValues,
): ValueState<OfValueStateOrValues<TValues>> {
  const state = createValueState<OfValueStateOrValues<TValues>>({
    value   : [] as any,
    hasValue: true,
  })

  for (let i = 0; i < values.length; i++) {
    const value = values[i]
    if (value instanceof ValueState) {
      state.hasValue &&= value.hasValue
      state.loading ||= value.loading
      state.hasError ||= value.hasError
      state.error ||= value.error
      state.value[i] = value.value
    }
    else {
      state.value[i] = void 0
      state.hasValue = false
    }
  }

  return state
}

export function resolveValueStatesFunc<TValues extends ValueState<any>[], TResult>(
  values: TValues,
  func: (...values: OfValueStateOrValues<TValues>) => TResult,
): ValueState<TResult> {
  const state = resolveValueStates(values)
  if (state.hasValue) {
    try {
      state.value = func.apply(void 0, state.value)
    }
    catch (error) {
      console.error(error)
      state.value = void 0
      state.hasValue = false
      state.error = error
      state.hasError = true
    }
  }
  else {
    state.value = void 0
  }
  return state as ValueState<TResult>
}

export async function asyncToValueState<TValue>(
  valueAsync: AsyncOrValue<TValue>,
  state?: ValueState<TValue>,
): Promise<ValueState<TValue>> {
  if (!state) {
    state = createValueState<TValue>()
  }

  try {
    state.loading = true

    const valuePromise: PromiseOrValue<StateOrValue<TValue>> = typeof valueAsync === 'function'
      ? (valueAsync as any)()
      : valueAsync

    let value: TValue | ValueState<TValue>

    if (isPromiseLike(valuePromise)) {
      value = await valuePromise
    }
    else {
      value = valuePromise
    }

    if (value instanceof ValueState) {
      state.value = value.value
      state.hasValue = value.hasValue
      state.error = value.error
      state.hasError = value.hasError
      state.loading = value.loading
    }
    else {
      state.value = value
      state.hasValue = true
      state.error = null
      state.hasError = false
      state.loading = false
    }
  }
  catch (error) {
    console.error(error)
    state.error = error
    state.hasError = true
    state.loading = false
  }

  return state
}
