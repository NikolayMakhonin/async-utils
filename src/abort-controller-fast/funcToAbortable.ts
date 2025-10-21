import {IAbortSignalFast, IUnsubscribe} from '@flemist/abort-controller-fast'
import {CustomPromise, promiseRejected} from 'src/custom-promise'

export async function funcToAbortable<T>(
  abortSignal: IAbortSignalFast|null|undefined,
  func: (abortPromise?: Promise<any>) => Promise<T>|T,
): Promise<T> {
  if (!abortSignal) {
    return func()
  }

  if (abortSignal.aborted) {
    return promiseRejected(abortSignal.reason)
  }

  const promise = new CustomPromise<any>()
  function onReject(value: T) {
    promise.reject(value)
  }
  const unsubscribe: IUnsubscribe = abortSignal.subscribe(onReject)
  try {
    return await func(promise.promise)
  }
  finally {
    unsubscribe()
  }
}
