import { AbortControllerFast } from '@flemist/abort-controller-fast';
import { toFuncWithFinally } from '../promise/toFuncWithFinally.mjs';
import '../isPromiseLike.mjs';
import '../promise/promiseFinally.mjs';

function useAbortController(func) {
    const abortController = new AbortControllerFast();
    return toFuncWithFinally(func, () => {
        abortController.abort();
    })(abortController.signal);
}

export { useAbortController };
