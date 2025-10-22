// import { getMicrotasksCount } from '$shared/lib/db-new/-test/getMicrotasksCount'
import type { IAbortSignalFast } from '@flemist/abort-controller-fast'
import 'setimmediate'
import {isPromiseLike} from 'src/isPromiseLike'
import {abortSignalToPromise} from 'src/abort-controller-fast/abortSignalToPromise'

// let _waitMicrotasksPromise: null | Promise<void> = null
// async function _waitMicrotasks() {
//   // // let count = 0
//   // while (true) {
//   //   const promise = Promise.resolve().then(EMPTY_FUNC)
//   //   const prevMicrotaskCount = getMicrotasksCount()
//   //   await promise
//   //   const microtaskCount = getMicrotasksCount()
//   //   if (microtaskCount === prevMicrotaskCount) {
//   //     // count++
//   //     // if (count >= 2) {
//   //     break
//   //     // }
//   //     // throw new Error('Unexpected behavior')
//   //   }
//   //   // else {
//   //   //   count = 0
//   //   // }
//   //   // if (microtaskCount === prevMicrotaskCount + 1) {
//   //   //   break
//   //   // }
//   // }
//   // _waitMicrotasksPromise = null
//   return new Promise<void>(resolve => {
//     setImmediate(resolve)
//   })
// }

export function waitMicrotasks(
  abortSignalOrPromise?: null | IAbortSignalFast | PromiseLike<any>,
): Promise<void> {
  // if (!_waitMicrotasksPromise) {
  //   _waitMicrotasksPromise = _waitMicrotasks()
  // }
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
