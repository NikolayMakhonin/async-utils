import {AbortControllerFast, IAbortSignalFast} from '@flemist/abort-controller-fast'

export function combineAbortSignals(...abortSignals: (IAbortSignalFast|null|undefined)[]): IAbortSignalFast {
  let abortController: AbortControllerFast|undefined
  function onAbort(reason) {
    abortController!.abort(reason)
  }

  let prevAbortSignal: IAbortSignalFast|undefined

  for (let i = 0; i < abortSignals.length; i++) {
    const abortSignal = abortSignals[i]
    if (!abortSignal) {
      continue
    }
    if (abortSignal.aborted) {
      return abortSignal
    }
    if (!prevAbortSignal) {
      prevAbortSignal = abortSignal
    }
    else {
      if (!abortController) {
        abortController = new AbortControllerFast()
        prevAbortSignal.subscribe(onAbort)
      }
      abortSignal.subscribe(onAbort)
    }
  }

  return abortController
    ? abortController.signal
    : prevAbortSignal || new AbortControllerFast().signal
}
