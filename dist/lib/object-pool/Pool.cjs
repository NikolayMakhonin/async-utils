'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
require('@flemist/abort-controller-fast');
var customPromise_CustomPromise = require('../custom-promise/CustomPromise.cjs');
var abortControllerFast_promiseToAbortable = require('../abort-controller-fast/promiseToAbortable.cjs');
require('../promise-fast/PromiseFast.cjs');
require('../isPromiseLike.cjs');
require('../custom-promise/rejectAsResolve.cjs');

class Pool {
    constructor(maxSize) {
        this.maxSize = 0;
        this._size = 0;
        this._tickPromise = new customPromise_CustomPromise.CustomPromise();
        if (!maxSize) {
            throw new Error('maxSize should be > 0');
        }
        this.maxSize = maxSize;
        this._size = maxSize;
    }
    get size() {
        return this._size;
    }
    get holdAvailable() {
        return this._size;
    }
    hold(count) {
        const size = this._size;
        if (count > size) {
            count = size;
        }
        if (count > 0) {
            this._size = size - count;
        }
        return count;
    }
    get maxReleaseCount() {
        return this.maxSize - this._size;
    }
    release(count) {
        const size = this._size;
        const maxReleaseCount = this.maxSize - size;
        if (count > maxReleaseCount) {
            count = maxReleaseCount;
        }
        if (count > 0) {
            this._size = size + count;
            if (this._tickPromise) {
                const tickPromise = this._tickPromise;
                this._tickPromise = null;
                tickPromise.resolve();
            }
        }
        return count;
    }
    tick(abortSignal) {
        if (!this._tickPromise) {
            this._tickPromise = new customPromise_CustomPromise.CustomPromise();
        }
        return abortControllerFast_promiseToAbortable.promiseToAbortable(abortSignal, this._tickPromise.promise);
    }
    holdWait(count, abortSignal) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            if (count > this.maxSize) {
                throw new Error(`holdCount (${count} > maxSize (${this.maxSize}))`);
            }
            let holdCount = 0;
            try {
                while (true) {
                    holdCount += this.hold(count - holdCount);
                    if (holdCount === count) {
                        return;
                    }
                    yield this.tick(abortSignal);
                }
            }
            catch (err) {
                this.release(holdCount);
                throw err;
            }
        });
    }
}

exports.Pool = Pool;
