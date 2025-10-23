import { AbortControllerFast } from '@flemist/abort-controller-fast';

function abortSignalToPromise(abortSignal) {
    if (!abortSignal) {
        return;
    }
    return new Promise((_, reject) => {
        abortSignal.subscribe(error => {
            reject(error);
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
