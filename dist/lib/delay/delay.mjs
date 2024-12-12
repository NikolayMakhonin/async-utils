import { timeControllerDefault } from '@flemist/time-controller';
import 'tslib';
import { rejectAsResolve } from '../custom-promise/rejectAsResolve.mjs';

function delay(milliseconds, abortSignal, timeController) {
    if (!Number.isFinite(milliseconds)) {
        throw new TypeError('milliseconds must be a finite number: ' + milliseconds);
    }
    return new Promise(function executor(resolve) {
        if (abortSignal && abortSignal.aborted) {
            rejectAsResolve(resolve, abortSignal.reason);
            return;
        }
        let unsubscribe;
        function onResolve() {
            if (unsubscribe) {
                unsubscribe();
            }
            resolve();
        }
        const _timeController = timeController || timeControllerDefault;
        const handle = _timeController.setTimeout(onResolve, milliseconds);
        if (abortSignal) {
            unsubscribe = abortSignal.subscribe(function abortListener(reason) {
                _timeController.clearTimeout(handle);
                rejectAsResolve(resolve, reason);
            });
        }
    });
}

export { delay };
