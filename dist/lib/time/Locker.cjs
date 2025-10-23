'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var isPromiseLike = require('../isPromiseLike.cjs');

class Locker {
    constructor() {
        this._lockPromise = null;
    }
    lock(handler) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            if (this._lockPromise) {
                yield this._lockPromise;
            }
            const promiseOrValue = handler();
            if (isPromiseLike.isPromiseLike(promiseOrValue)) {
                const promise = promiseOrValue.then(() => {
                    if (this._lockPromise === promise) {
                        this._lockPromise = null;
                    }
                }, () => {
                    if (this._lockPromise === promise) {
                        this._lockPromise = null;
                    }
                });
                this._lockPromise = promise;
            }
            return promiseOrValue;
        });
    }
}

exports.Locker = Locker;
