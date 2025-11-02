import { AbortControllerFast } from '@flemist/abort-controller-fast';

function abortSignalToPromise(abortSignal, options) {
    if (!abortSignal) {
        return;
    }
    return new Promise((resolve, reject) => {
        abortSignal.subscribe(error => {
            if (options === null || options === void 0 ? void 0 : options.dontThrow) {
                resolve();
            }
            else {
                reject(error);
            }
        });
    });
}
function promiseToAbortSignal(promise) {
    const abortController = new AbortControllerFast();
    promise.then(() => {
        abortController.abort();
    }, () => {
        abortController.abort();
    });
    return abortController.signal;
}

export { abortSignalToPromise, promiseToAbortSignal };
