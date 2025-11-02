
import {
  AbortControllerFast,
  type IAbortSignalFast,
} from '@flemist/abort-controller-fast'
import {PromiseOrValue} from 'src/types'

export type AbortSignalToPromiseOptions = {
  dontThrow?: null | boolean
}

export function abortSignalToPromise(
  abortSignal: IAbortSignalFast | null | undefined,
  options?: null | AbortSignalToPromiseOptions,
): PromiseOrValue<void> {
  if (!abortSignal) {
    return
  }
  return new Promise<void>((resolve, reject) => {
    abortSignal.subscribe(error => {
      if (options?.dontThrow) {
        resolve()
      }
      else {
        reject(error)
      }
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
