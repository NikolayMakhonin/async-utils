
import {
  AbortControllerFast,
  type IAbortSignalFast,
} from '@flemist/abort-controller-fast'
import {PromiseOrValue} from 'src/types'

export function abortSignalToPromise(
  abortSignal: IAbortSignalFast | null | undefined,
): PromiseOrValue<void> {
  if (!abortSignal) {
    return
  }
  return new Promise<void>((_, reject) => {
    abortSignal.subscribe(error => {
      reject(error)
    })
  })
}

export function promiseToAbortSignal(
  promise: PromiseLike<any>,
): IAbortSignalFast {
  const abortController = new AbortControllerFast()
  promise.then(
    () => {
      abortController.abort()
    },
    () => {
      abortController.abort()
    },
  )
  return abortController.signal
}
