import type { IAbortSignalFast } from '@flemist/abort-controller-fast'
import 'setimmediate'
import {isPromiseLike} from 'src/isPromiseLike'
import {abortSignalToPromise} from 'src/abort-controller-fast/abortSignalToPromise'

export function waitMicrotasks(
  abortSignalOrPromise?: null | IAbortSignalFast | PromiseLike<any>,
): Promise<void> {
  const waitPromise = new Promise<void>(resolve => {
    setImmediate(resolve)
  })
  const promise = isPromiseLike(abortSignalOrPromise)
    ? abortSignalOrPromise
    : abortSignalOrPromise
      ? abortSignalToPromise(abortSignalOrPromise)
      : null
  return promise ? Promise.race([waitPromise, promise]) : waitPromise
}
