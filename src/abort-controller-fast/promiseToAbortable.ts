import {IAbortSignalFast, IUnsubscribe} from '@flemist/abort-controller-fast'
import {rejectAsResolve} from 'src/custom-promise'

export function promiseToAbortable<T>(
  abortSignal: IAbortSignalFast|null,
  promise: Promise<T>,
): Promise<T> {
  return new Promise<T>(function executor(resolve) {
    if (abortSignal && abortSignal.aborted) {
      rejectAsResolve(resolve, abortSignal.reason)
      return
    }

    let unsubscribe: IUnsubscribe
    function onResolve(value: T) {
      if (unsubscribe) {
        unsubscribe()
      }
      resolve(value)
    }

    let rejected: boolean
    function onReject(value: T) {
      if (rejected) {
        return
      }

      rejected = true

      if (unsubscribe) {
        unsubscribe()
      }

      rejectAsResolve(resolve, value)
    }

    promise
      .then(onResolve)
      .catch(onReject)

    if (abortSignal) {
      unsubscribe = abortSignal.subscribe(onReject)
    }
  })
}
