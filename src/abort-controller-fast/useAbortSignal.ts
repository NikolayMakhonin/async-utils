import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {toFuncWithFinally} from 'src/promise/toFuncWithFinally'
import {FuncAny} from 'src/contracts'

export function useAbortSignal<TFunc extends FuncAny>(
  abortSignal: IAbortSignalFast,
  onAbort: () => void,
  func: TFunc,
): TFunc {
  if (!abortSignal) {
    return func(abortSignal)
  }
  const unsubscribe = abortSignal.subscribe(onAbort)
  return toFuncWithFinally(func, unsubscribe)
}

