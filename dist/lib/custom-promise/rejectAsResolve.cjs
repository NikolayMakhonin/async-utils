'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _promiseRejected(reason) {
    return {
        then(_, reject) {
            void reject(reason);
        },
    };
}
/**
 * It needed to prevent memory leak on some platforms
 * see: https://stackoverflow.com/questions/72727907/promise-reject-is-very-slow-on-node-js-18
 *  */
function rejectAsResolve(resolve, reason) {
    resolve(_promiseRejected(reason));
}
/**
 * It needed to prevent memory leak on some platforms
 * see: https://stackoverflow.com/questions/72727907/promise-reject-is-very-slow-on-node-js-18
 * */
function promiseRejected(reason) {
    return Promise.resolve(_promiseRejected(reason));
}

exports.promiseRejected = promiseRejected;
exports.rejectAsResolve = rejectAsResolve;
