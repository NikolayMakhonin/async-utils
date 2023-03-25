import { isPromiseLike } from '../isPromiseLike.mjs';
import { promiseFinally } from './promiseFinally.mjs';

function toFuncWithFinally(func, onFinally) {
    if (!onFinally) {
        return func;
    }
    return function funcWithFinally() {
        try {
            const resultOrPromise = func.apply(this, arguments);
            if (!isPromiseLike(resultOrPromise)) {
                return resultOrPromise;
            }
            return promiseFinally(resultOrPromise, onFinally);
        }
        finally {
            onFinally();
        }
    };
}

export { toFuncWithFinally };
