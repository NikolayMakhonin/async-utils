import '@flemist/abort-controller-fast';
import 'tslib';
import { CustomPromise } from '../custom-promise/CustomPromise.mjs';
import { promiseToAbortable } from '../abort-controller-fast/promiseToAbortable.mjs';
import '../promise-fast/PromiseFast.mjs';
import '../isPromiseLike.mjs';
import '../custom-promise/rejectAsResolve.mjs';

class ObjectPool {
    constructor(maxSize) {
        this.maxSize = 0;
        this._available = 0;
        this._stack = [];
        this._tickPromise = new CustomPromise();
        if (!maxSize) {
            throw new Error('maxSize should be > 0');
        }
        this.maxSize = maxSize;
        this._available = maxSize;
    }
    get size() {
        return this._stack.length;
    }
    get available() {
        return this._available;
    }
    get() {
        const lastIndex = this._available - 1;
        if (lastIndex >= 0) {
            this._available--;
            if (lastIndex >= this._stack.length) {
                return null;
            }
            const obj = this._stack[lastIndex];
            this._stack.length = lastIndex;
            return obj;
        }
        return null;
    }
    release(obj) {
        if (this._stack.length >= this.maxSize) {
            return false;
        }
        this._stack.push(obj);
        this._available = Math.min(this.maxSize, this._available + 1);
        if (this._tickPromise) {
            const tickPromise = this._tickPromise;
            this._tickPromise = null;
            tickPromise.resolve();
        }
        return true;
    }
    tick(abortSignal) {
        if (this._available > 0) {
            return;
        }
        if (!this._tickPromise) {
            this._tickPromise = new CustomPromise();
        }
        return promiseToAbortable(abortSignal, this._tickPromise.promise);
    }
}

export { ObjectPool };
