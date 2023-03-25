import { toFuncWithFinally } from '../promise/toFuncWithFinally.mjs';
import '../isPromiseLike.mjs';
import '../promise/promiseFinally.mjs';

function toFuncWithAbortSignal(abortSignal, onAbort, func) {
    if (!abortSignal || !onAbort) {
        return func;
    }
    const unsubscribe = abortSignal.subscribe(onAbort);
    return toFuncWithFinally(func, unsubscribe);
}

export { toFuncWithAbortSignal };
