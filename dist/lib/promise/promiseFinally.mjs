import { isPromiseLike } from '../isPromiseLike.mjs';

function promiseFinally(promise, onFinally) {
    if (!onFinally) {
        return promise;
    }
    return promise.then((result) => {
        const voidOrPromise = onFinally();
        if (!isPromiseLike(voidOrPromise)) {
            return result;
        }
        return voidOrPromise.then(() => result);
    }, (err) => {
        const voidOrPromise = onFinally();
        if (!isPromiseLike(voidOrPromise)) {
            throw err;
        }
        return voidOrPromise.then(() => {
            throw err;
        });
    });
}

export { promiseFinally };
