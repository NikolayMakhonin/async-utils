'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var promiseFast_PromiseFast = require('../promise-fast/PromiseFast.cjs');
var customPromise_rejectAsResolve = require('./rejectAsResolve.cjs');
require('../isPromiseLike.cjs');
require('../promise-fast/promiseSchedulerEnqueue.cjs');
require('tslib');
require('../promise/helpers.cjs');

const emptyFunc = function emptyFunc() { };
class CustomPromise {
    constructor(abortSignal) {
        this._status = 'pending';
        if (abortSignal && abortSignal.aborted) {
            this.promise = promiseFast_PromiseFast.PromiseFast.reject(abortSignal.reason);
            this.resolve = emptyFunc;
            this.reject = emptyFunc;
        }
        else {
            let resolve;
            let reject;
            this.promise = new Promise(function executor(_resolve) {
                resolve = _resolve;
                reject = function _rejectAsResolve(reason) {
                    customPromise_rejectAsResolve.rejectAsResolve(_resolve, reason);
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

exports.CustomPromise = CustomPromise;
