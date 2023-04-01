'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');

function fixAsyncStackTrace(func) {
    return tslib.__awaiter(this, void 0, void 0, function* () {
        const error = new Error();
        try {
            return yield func();
        }
        catch (err) {
            err.stack += '\n' + error.stack.substring(error.stack.indexOf('\n'));
            throw err;
        }
    });
}

exports.fixAsyncStackTrace = fixAsyncStackTrace;
