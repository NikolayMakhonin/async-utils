import type { IAbortSignalFast } from '@flemist/abort-controller-fast'
import 'setimmediate'
import {isPromiseLike} from 'src/isPromiseLike'
import {abortSignalToPromise} from 'src/abort-controller-fast/abortSignalToPromise'
import {EMPTY_FUNC} from 'src/constants'

export type WaitMicrotasksOptions = {
  dontThrow?: null | boolean,
}

export function waitMicrotasks(
  abortSignalOrPromise?: null | IAbortSignalFast | PromiseLike<any>,
  options?: null | WaitMicrotasksOptions,
): Promise<void> {
  const waitPromise = new Promise<void>(resolve => {
    setImmediate(resolve)
  })
  const promise = isPromiseLike(abortSignalOrPromise)
    ? abortSignalOrPromise
    : abortSignalOrPromise
      ? abortSignalToPromise(abortSignalOrPromise)
      : null
  if (promise) {
    const result = Promise.race([waitPromise, promise])
    return options?.dontThrow ? result.catch(EMPTY_FUNC) : result
  }
  return waitPromise
}
