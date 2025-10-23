import 'setimmediate';
import { isPromiseLike } from '../isPromiseLike.mjs';
import { abortSignalToPromise } from '../abort-controller-fast/abortSignalToPromise.mjs';
import '@flemist/abort-controller-fast';

function waitMicrotasks(abortSignalOrPromise) {
    const waitPromise = new Promise(resolve => {
        setImmediate(resolve);
    });
    const promise = isPromiseLike(abortSignalOrPromise)
        ? abortSignalOrPromise
        : abortSignalOrPromise
            ? abortSignalToPromise(abortSignalOrPromise)
            : null;
    return promise ? Promise.race([waitPromise, promise]) : waitPromise;
}

export { waitMicrotasks };
