import {IAbortSignalFast, IUnsubscribe} from '@flemist/abort-controller-fast'
import {ITimeController, timeControllerDefault} from '@flemist/time-controller'
import {rejectAsResolve} from 'src/custom-promise'

export function delay(milliseconds: number, abortSignal?: IAbortSignalFast, timeController?: ITimeController) {
  return new Promise<void>(function executor(resolve) {
    if (abortSignal && abortSignal.aborted) {
      rejectAsResolve(resolve, abortSignal.reason)
      return
    }

    let unsubscribe: IUnsubscribe
    function onResolve() {
      if (unsubscribe) {
        unsubscribe()
      }
      resolve()
    }

    const _timeController = timeController || timeControllerDefault
    const handle = _timeController.setTimeout(onResolve, milliseconds)

    if (abortSignal) {
      unsubscribe = abortSignal.subscribe(function abortListener(reason) {
        _timeController.clearTimeout(handle)
        rejectAsResolve(resolve, reason)
      })
    }
  })
}
