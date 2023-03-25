import { toFuncWithFinally } from '../promise/toFuncWithFinally.mjs';
import '../isPromiseLike.mjs';
import '../promise/promiseFinally.mjs';

function useAbortSignal(abortSignal, onAbort, func) {
    if (!abortSignal) {
        return func(abortSignal);
    }
    const unsubscribe = abortSignal.subscribe(onAbort);
    return toFuncWithFinally(func, unsubscribe);
}

export { useAbortSignal };
