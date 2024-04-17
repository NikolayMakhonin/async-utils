import {AbortControllerFast, IAbortSignalFast} from '@flemist/abort-controller-fast'
import {runWithFinally} from 'src/promise/runWithFinally'

export function useAbortController<T>(
  func: (abortSignal: IAbortSignalFast) => T,
): T {
  const abortController = new AbortControllerFast()
  return runWithFinally(
    null,
    () => func(abortController.signal),
    () => {
      abortController.abort()
    },
  )
}
