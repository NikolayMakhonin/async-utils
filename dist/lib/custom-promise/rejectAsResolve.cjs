'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function promiseRejected(reason) {
    return {
        then(_, reject) {
            void reject(reason);
        },
    };
}
function rejectAsResolve(resolve, reason) {
    resolve(promiseRejected(reason));
}

exports.rejectAsResolve = rejectAsResolve;
