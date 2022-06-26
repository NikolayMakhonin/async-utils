import { timeControllerDefault } from '@flemist/time-controller';

function delay(milliseconds, abortSignal, timeController) {
    return new Promise(function executor(resolve, reject) {
        if (abortSignal && abortSignal.aborted) {
            reject(abortSignal.reason);
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
                reject(reason);
            });
        }
    });
}

export { delay };
