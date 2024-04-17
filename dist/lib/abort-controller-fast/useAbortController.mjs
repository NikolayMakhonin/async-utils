import { AbortControllerFast } from '@flemist/abort-controller-fast';
import { runWithFinally } from '../promise/runWithFinally.mjs';
import '../isPromiseLike.mjs';
import '../promise/promiseFinally.mjs';

function useAbortController(func) {
    const abortController = new AbortControllerFast();
    return runWithFinally(null, () => func(abortController.signal), () => {
        abortController.abort();
    });
}

export { useAbortController };
