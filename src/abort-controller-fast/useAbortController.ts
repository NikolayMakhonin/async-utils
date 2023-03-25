import {AbortControllerFast, IAbortSignalFast} from '@flemist/abort-controller-fast'
import {toFuncWithFinally} from 'src/promise/toFuncWithFinally'

export function useAbortController<T>(
  func: (abortSignal: IAbortSignalFast) => T,
): T {
  const abortController = new AbortControllerFast()
  return toFuncWithFinally(func, () => {
    abortController.abort()
  })(abortController.signal)
}
