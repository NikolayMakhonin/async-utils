'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// noinspection JSConstantReassignment
function isPromiseLike(obj) {
    if (obj != null
        && typeof obj === 'object'
        && typeof obj.then === 'function') {
        return true;
    }
    return false;
}
function callFulfill(value, fulfill, nextPromise) {
    try {
        const result = fulfill
            ? fulfill(value)
            : value;
        nextPromise.resolve(result);
    }
    catch (err) {
        nextPromise.reject(err);
    }
}
function callReject(reason, reject, nextPromise) {
    try {
        const result = reject
            ? reject(reason)
            : reason;
        nextPromise.resolve(result);
    }
    catch (err) {
        nextPromise.reject(err);
    }
}
class PromiseFast {
    constructor(executor) {
        this.status = 'pending';
        this.value = void 0;
        this.reason = void 0;
        this._handlers = null;
        const resolve = this.resolve;
        const reject = this.reject;
        const resolveAsync = this._resolveAsync;
        const rejectAsync = this._rejectAsync;
        this.resolve = (value) => {
            resolve.call(this, value);
        };
        this.reject = (reason) => {
            reject.call(this, reason);
        };
        this._resolveAsync = (value) => {
            resolveAsync.call(this, value);
        };
        this._rejectAsync = (reason) => {
            rejectAsync.call(this, reason);
        };
        if (executor) {
            executor(this.resolve, this.reject);
        }
    }
    resolve(value) {
        if (this.status !== 'pending') {
            return;
        }
        // @ts-expect-error
        this.status = 'fulfilled';
        this._resolveAsync(value);
    }
    _resolveAsync(value) {
        if (isPromiseLike(value)) {
            value.then(this._resolveAsync, this._rejectAsync);
            return;
        }
        this._resolve(value);
    }
    _resolve(value) {
        const handlers = this._handlers;
        this._handlers = null;
        // @ts-expect-error
        this.value = value;
        if (handlers) {
            for (let i = 0, len = handlers.length; i < len; i++) {
                const [fulfill, , nextPromise] = handlers[i];
                callReject(value, fulfill, nextPromise);
            }
        }
    }
    reject(reason) {
        if (this.status !== 'pending') {
            return;
        }
        // @ts-expect-error
        this.status = 'rejected';
        this._rejectAsync(reason);
    }
    _rejectAsync(reason) {
        if (isPromiseLike(reason)) {
            reason.then(this._resolveAsync, this._rejectAsync);
            return;
        }
        this._resolve(reason);
    }
    _reject(reason) {
        const handlers = this._handlers;
        this._handlers = null;
        // @ts-expect-error
        this.reason = reason;
        if (handlers) {
            for (let i = 0, len = handlers.length; i < len; i++) {
                const [, reject, nextPromise] = handlers[i];
                callReject(reason, reject, nextPromise);
            }
        }
    }
    then(onfulfilled, onrejected) {
        const nextPromise = new PromiseFast();
        if (this.status === 'pending') {
            this._handlers.push([onfulfilled, onrejected, nextPromise]);
        }
        else if (this.status === 'fulfilled') {
            callFulfill(this.value, onfulfilled, nextPromise);
        }
        else {
            callReject(this.value, onrejected, nextPromise);
        }
        return nextPromise;
    }
    catch(onrejected) {
        return this.then(void 0, onrejected);
    }
    static resolve(value) {
        const promise = new PromiseFast();
        promise.resolve(value);
        return promise;
    }
    static reject(reason) {
        const promise = new PromiseFast();
        promise.reject(reason);
        return promise;
    }
}
global.Promise = PromiseFast;

exports.PromiseFast = PromiseFast;
