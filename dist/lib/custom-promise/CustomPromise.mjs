import { PromiseFast } from '../promise-fast/PromiseFast.mjs';
import { rejectAsResolve } from './rejectAsResolve.mjs';
import '../isPromiseLike.mjs';
import '../promise-fast/promiseSchedulerEnqueue.mjs';
import 'tslib';
import '../promise-fast/helpers.mjs';

const emptyFunc = function emptyFunc() { };
class CustomPromise {
    constructor(abortSignal) {
        this._status = 'pending';
        if (abortSignal && abortSignal.aborted) {
            this.promise = PromiseFast.reject(abortSignal.reason);
            this.resolve = emptyFunc;
            this.reject = emptyFunc;
        }
        else {
            let resolve;
            let reject;
            this.promise = new Promise(function executor(_resolve) {
                resolve = _resolve;
                reject = function _rejectAsResolve(reason) {
                    rejectAsResolve(_resolve, reason);
                };
            });
            if (abortSignal) {
                const unsubscribe = abortSignal.subscribe(function abortListener(reason) {
                    reject(reason);
                });
                this.resolve = function _resolve(result) {
                    unsubscribe();
                    resolve(result);
                };
                this.reject = function _reject(error) {
                    unsubscribe();
                    reject(error);
                };
            }
            else {
                this.resolve = resolve;
                this.reject = reject;
            }
        }
        this.promise.then(() => {
            this._status = 'resolved';
        }, () => {
            this._status = 'rejected';
        });
    }
    get state() {
        return this._status;
    }
}

export { CustomPromise };
