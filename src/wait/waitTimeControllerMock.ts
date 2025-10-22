import { waitMicrotasks } from './waitMicrotasks'
import { type TimeControllerMock } from '@flemist/time-controller'
import type { IAbortSignalFast } from '@flemist/abort-controller-fast'
import {isPromiseLike} from 'src/isPromiseLike'
import {promiseToAbortSignal} from 'src/abort-controller-fast/abortSignalToPromise'

export async function waitTimeControllerMock<T = any>(
  timeControllerMock: TimeControllerMock,
  abortSignalOrPromise: PromiseLike<T>,
): Promise<T>
export async function waitTimeControllerMock<T = any>(
  timeControllerMock: TimeControllerMock,
  abortSignal?: null | IAbortSignalFast | PromiseLike<T>,
): Promise<void>
export async function waitTimeControllerMock<T = any>(
  timeControllerMock: TimeControllerMock,
  abortSignalOrPromise?: null | IAbortSignalFast | PromiseLike<T>,
) {
  let promise: PromiseLike<T> | null | undefined
  let abortSignal: IAbortSignalFast | null | undefined

  if (isPromiseLike(abortSignalOrPromise)) {
    promise = abortSignalOrPromise
    abortSignal = promiseToAbortSignal(promise)
  }
  else {
    promise = null
    abortSignal = abortSignalOrPromise
  }

  while (!abortSignal?.aborted) {
    await waitMicrotasks(abortSignalOrPromise)
    const nextTime = timeControllerMock.nextQueuedTime
    if (nextTime == null) {
      if (promise && !abortSignal?.aborted) {
        // throw new Error('[waitTimeControllerMock] promise is not resolved')
        continue
      }
      break
    }
    timeControllerMock.setTime(nextTime)
  }

  return promise
}
