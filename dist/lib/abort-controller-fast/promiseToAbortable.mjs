import 'tslib';
import { rejectAsResolve } from '../custom-promise/rejectAsResolve.mjs';

function promiseToAbortable(abortSignal, promise) {
    if (!abortSignal) {
        return promise;
    }
    return new Promise(function executor(resolve) {
        if (abortSignal && abortSignal.aborted) {
            rejectAsResolve(resolve, abortSignal.reason);
            return;
        }
        let unsubscribe;
        function onResolve(value) {
            if (unsubscribe) {
                unsubscribe();
            }
            resolve(value);
        }
        let rejected;
        function onReject(value) {
            if (rejected) {
                return;
            }
            rejected = true;
            if (unsubscribe) {
                unsubscribe();
            }
            rejectAsResolve(resolve, value);
        }
        promise
            .then(onResolve)
            .catch(onReject);
        if (abortSignal) {
            unsubscribe = abortSignal.subscribe(onReject);
        }
    });
}

export { promiseToAbortable };
