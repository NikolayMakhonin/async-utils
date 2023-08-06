'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isPromiseLike = require('../isPromiseLike.cjs');
var promiseFast_promiseSchedulerEnqueue = require('./promiseSchedulerEnqueue.cjs');
var promise_helpers = require('../promise/helpers.cjs');
require('tslib');

/* eslint-disable node/no-sync */
function callFulfill(value, fulfill, nextPromise) {
    promiseFast_promiseSchedulerEnqueue.promiseSchedulerEnqueue(() => {
        try {
            const result = fulfill
                ? fulfill(value)
                : value;
            // @ts-expect-error
            nextPromise._resolve(result);
        }
        catch (err) {
            // @ts-expect-error
            nextPromise._reject(err);
        }
    });
}
function callReject(reason, reject, nextPromise) {
    promiseFast_promiseSchedulerEnqueue.promiseSchedulerEnqueue(() => {
        if (!reject) {
            // @ts-expect-error
            nextPromise._reject(reason);
            return;
        }
        try {
            const result = reject(reason);
            // @ts-expect-error
            nextPromise._resolve(result);
        }
        catch (err) {
            // @ts-expect-error
            nextPromise._reject(err);
        }
    });
}
const emptyFunc = function emptyFunc() { };
class PromiseFast {
    constructor(executor) {
        this.status = 'pending';
        this.value = void 0;
        this.reason = void 0;
        this._handlers = null;
        const resolve = this._resolve;
        const reject = this._reject;
        const resolveAsync = this._resolveAsync;
        const rejectAsync = this._rejectAsync;
        const _this = this;
        this._resolve = function _resolve(value) {
            resolve.call(_this, value);
        };
        this._reject = function _reject(reason) {
            reject.call(_this, reason);
        };
        this._resolveAsync = function _resolveAsync(value) {
            resolveAsync.call(_this, value);
        };
        this._rejectAsync = function _rejectAsync(reason) {
            rejectAsync.call(_this, reason);
        };
        executor(this._resolve, this._reject);
    }
    _resolve(value) {
        if (this.status !== 'pending') {
            return;
        }
        // @ts-expect-error
        this.status = 'fulfilled';
        this._resolveAsync(value);
    }
    _resolveAsync(value) {
        if (isPromiseLike.isPromiseLike(value)) {
            value.then(this._resolveAsync, this._rejectAsync);
            return;
        }
        this._resolveSync(value);
    }
    _resolveSync(value) {
        const handlers = this._handlers;
        // @ts-expect-error
        this.value = value;
        if (handlers != null) {
            this._handlers = null;
            for (let i = 0, len = handlers.length; i < len; i++) {
                const [fulfill, , nextPromise] = handlers[i];
                callFulfill(value, fulfill, nextPromise);
            }
        }
    }
    _reject(reason) {
        if (this.status !== 'pending') {
            return;
        }
        this._rejectAsync(reason);
    }
    _rejectAsync(reason) {
        // @ts-expect-error
        this.status = 'rejected';
        if (isPromiseLike.isPromiseLike(reason)) {
            (reason).then(this._rejectAsync, this._rejectAsync);
            return;
        }
        this._rejectSync(reason);
    }
    _rejectSync(reason) {
        const handlers = this._handlers;
        // @ts-expect-error
        this.reason = reason;
        if (handlers != null) {
            this._handlers = null;
            for (let i = 0, len = handlers.length; i < len; i++) {
                const [, reject, nextPromise] = handlers[i];
                callReject(reason, reject, nextPromise);
            }
        }
    }
    then(onfulfilled, onrejected) {
        const nextPromise = new PromiseFast(emptyFunc);
        if (this.status === 'pending') {
            if (this._handlers == null) {
                this._handlers = [];
            }
            this._handlers.push([onfulfilled, onrejected, nextPromise]);
        }
        else if (this.status === 'fulfilled') {
            callFulfill(this.value, onfulfilled, nextPromise);
        }
        else {
            callReject(this.reason, onrejected, nextPromise);
        }
        return nextPromise;
    }
    catch(onrejected) {
        return this.then(void 0, onrejected);
    }
    finally(onfinally) {
        const onfulfilled = onfinally && (function _onfulfilled(o) {
            const result = onfinally();
            if (isPromiseLike.isPromiseLike(result)) {
                return result.then(() => o);
            }
            return PromiseFast.resolve(o);
        });
        const onrejected = onfinally && (function _onrejected(o) {
            const result = onfinally();
            if (isPromiseLike.isPromiseLike(result)) {
                return result.then(() => PromiseFast.reject(o));
            }
            return PromiseFast.reject(o);
        });
        return this.then(onfulfilled, onrejected);
    }
    static resolve(value) {
        const promise = new PromiseFast(emptyFunc);
        promise._resolve(value);
        return promise;
    }
    static reject(reason) {
        const promise = new PromiseFast(emptyFunc);
        promise._reject(reason);
        return promise;
    }
    get [Symbol.toStringTag]() {
        return 'Promise';
    }
    static get [Symbol.species]() {
        return PromiseFast;
    }
    static all(values) {
        return promise_helpers.promiseAll(values, PromiseFast);
    }
    static allSettled(values) {
        return promise_helpers.promiseAllSettled(values, PromiseFast);
    }
    static any(values) {
        return promise_helpers.promiseAny(values, PromiseFast);
    }
    static race(values) {
        return promise_helpers.promiseRace(values, PromiseFast);
    }
}

exports.PromiseFast = PromiseFast;
