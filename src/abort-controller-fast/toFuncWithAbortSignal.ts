import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {toFuncWithFinally} from 'src/promise/toFuncWithFinally'
import {FuncAny} from 'src/contracts'

/** @deprecated */
export function toFuncWithAbortSignal<TFunc extends FuncAny>(
  abortSignal: IAbortSignalFast | null|undefined,
  onAbort: (() => void) | null|undefined,
  func: TFunc,
): TFunc {
  if (!abortSignal || !onAbort) {
    return func
  }
  const unsubscribe = abortSignal.subscribe(onAbort)
  return toFuncWithFinally(func, unsubscribe)
}

