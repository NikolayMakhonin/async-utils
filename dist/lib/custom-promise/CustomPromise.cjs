'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const emptyFunc = function emptyFunc() { };
class CustomPromise {
    constructor(abortSignal) {
        if (abortSignal && abortSignal.aborted) {
            this.promise = Promise.reject(abortSignal.reason);
            this.resolve = emptyFunc;
            this.reject = emptyFunc;
        }
        else {
            let resolve;
            let reject;
            this.promise = new Promise(function executor(_resolve, _reject) {
                resolve = _resolve;
                reject = _reject;
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
    }
}

exports.CustomPromise = CustomPromise;
