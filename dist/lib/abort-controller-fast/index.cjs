'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var abortControllerFast_combineAbortSignals = require('./combineAbortSignals.cjs');
var abortControllerFast_funcToAbortable = require('./funcToAbortable.cjs');
var abortControllerFast_promiseToAbortable = require('./promiseToAbortable.cjs');
var abortControllerFast_useAbortController = require('./useAbortController.cjs');
require('@flemist/abort-controller-fast');
require('tslib');
require('../custom-promise/CustomPromise.cjs');
require('../promise-fast/PromiseFast.cjs');
require('../isPromiseLike.cjs');
require('../custom-promise/rejectAsResolve.cjs');



exports.combineAbortSignals = abortControllerFast_combineAbortSignals.combineAbortSignals;
exports.funcToAbortable = abortControllerFast_funcToAbortable.funcToAbortable;
exports.promiseToAbortable = abortControllerFast_promiseToAbortable.promiseToAbortable;
exports.useAbortController = abortControllerFast_useAbortController.useAbortController;
