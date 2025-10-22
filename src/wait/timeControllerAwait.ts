import { TimeControllerMock } from '@flemist/time-controller'
import { EMPTY_FUNC } from 'src/constants'

export type TimeControllerAwaitOptions = {
  iterations: number
  getAddTime?: null | ((iteration: number) => number)
  getAwaitCount?: null | ((iteration: number) => number)
  shouldStop?: null | ((iteration: number) => boolean)
}

export async function timeControllerAwait(
  timeController: TimeControllerMock,
  {
    iterations,
    getAddTime,
    getAwaitCount,
    shouldStop,
  }: TimeControllerAwaitOptions,
) {
  for (let i = 0; i < iterations; i++) {
    if (shouldStop && shouldStop(i)) {
      break
    }
    const addTime = getAddTime ? getAddTime(i) : 1
    const awaitCount = getAwaitCount ? getAwaitCount(i) : 1
    timeController.addTime(addTime)
    for (let j = 0; j < awaitCount; j++) {
      await Promise.resolve().then(EMPTY_FUNC)
    }
  }
}

export async function timeControllerAwaitPromise(
  timeController: TimeControllerMock,
  promise: Promise<any>,
  { iterations, getAddTime, getAwaitCount }: TimeControllerAwaitOptions,
) {
  let stop = false
  promise.then(
    () => {
      stop = true
    },
    () => {
      stop = true
    },
  )
  await timeControllerAwait(timeController, {
    iterations,
    getAddTime,
    getAwaitCount,
    shouldStop: () => stop,
  })
  if (!stop) {
    throw new Error('Timeout')
  }
}
