import { __awaiter } from 'tslib';
import { CustomPromise } from '../custom-promise/CustomPromise.mjs';
import { promiseRejected } from '../custom-promise/rejectAsResolve.mjs';
import '../promise-fast/PromiseFast.mjs';
import '../isPromiseLike.mjs';

function funcToAbortable(abortSignal, func) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!abortSignal) {
            return func();
        }
        if (abortSignal.aborted) {
            return promiseRejected(abortSignal.reason);
        }
        const promise = new CustomPromise();
        function onReject(value) {
            promise.reject(value);
        }
        const unsubscribe = abortSignal.subscribe(onReject);
        try {
            return yield func(promise.promise);
        }
        finally {
            unsubscribe();
        }
    });
}

export { funcToAbortable };
