import {AbortControllerFast, IAbortSignalFast} from '@flemist/abort-controller-fast'

export function combineAbortSignals(...abortSignals: IAbortSignalFast[]): IAbortSignalFast {
  const abortController = new AbortControllerFast()

  function onAbort(reason) {
    abortController.abort(reason)
  }

  for (let i = 0; i < abortSignals.length; i++) {
    const abortSignal = abortSignals[i]
    if (!abortSignal) {
      continue
    }
    if (abortSignal.aborted) {
      onAbort.call(abortSignal)
      break
    }
    else {
      abortSignal.subscribe(onAbort)
    }
  }

  return abortController.signal
}
