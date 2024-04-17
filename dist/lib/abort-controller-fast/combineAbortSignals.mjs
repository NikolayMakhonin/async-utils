import { AbortControllerFast } from '@flemist/abort-controller-fast';

function combineAbortSignals(...abortSignals) {
    let abortController;
    function onAbort(reason) {
        abortController.abort(reason);
    }
    let prevAbortSignal;
    for (let i = 0; i < abortSignals.length; i++) {
        const abortSignal = abortSignals[i];
        if (!abortSignal) {
            continue;
        }
        if (abortSignal.aborted) {
            return abortSignal;
        }
        if (!prevAbortSignal) {
            prevAbortSignal = abortSignal;
        }
        else {
            if (!abortController) {
                abortController = new AbortControllerFast();
                prevAbortSignal.subscribe(onAbort);
            }
            abortSignal.subscribe(onAbort);
        }
    }
    return abortController
        ? abortController.signal
        : prevAbortSignal || new AbortControllerFast().signal;
}

export { combineAbortSignals };
