'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isPromiseLike = require('../isPromiseLike.cjs');
var promise_promiseFinally = require('./promiseFinally.cjs');

function runWithFinally(
/** init executes outside of try-catch block without onFinally and returns context that will be passed to func */
init, 
/** func executes in try-catch block and onFinally executes in finally block */
func, onFinally) {
    function _run(context) {
        if (!onFinally) {
            return func(context);
        }
        try {
            const resultOrPromise = func(context);
            if (!isPromiseLike.isPromiseLike(resultOrPromise)) {
                const voidOrPromise = onFinally();
                if (!isPromiseLike.isPromiseLike(voidOrPromise)) {
                    return resultOrPromise;
                }
                return voidOrPromise.then(() => resultOrPromise);
            }
            return promise_promiseFinally.promiseFinally(resultOrPromise, onFinally);
        }
        catch (err) {
            const voidOrPromise = onFinally();
            if (!isPromiseLike.isPromiseLike(voidOrPromise)) {
                throw err;
            }
            return voidOrPromise.then(() => {
                throw err;
            });
        }
    }
    const contextOrPromise = init ? init() : void 0;
    if (!isPromiseLike.isPromiseLike(contextOrPromise)) {
        return _run(contextOrPromise);
    }
    return contextOrPromise.then(_run);
}

exports.runWithFinally = runWithFinally;
