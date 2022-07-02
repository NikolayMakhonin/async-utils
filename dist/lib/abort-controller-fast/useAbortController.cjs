'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var abortControllerFast = require('@flemist/abort-controller-fast');

function useAbortController(func) {
    return tslib.__awaiter(this, void 0, void 0, function* () {
        const abortController = new abortControllerFast.AbortControllerFast();
        try {
            return yield func(abortController.signal);
        }
        finally {
            abortController.abort();
        }
    });
}

exports.useAbortController = useAbortController;
