'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var delay_delay = require('./delay/delay.cjs');
var customPromise_CustomPromise = require('./custom-promise/CustomPromise.cjs');
var abortControllerFast_combineAbortSignals = require('./abort-controller-fast/combineAbortSignals.cjs');
var abortControllerFast_funcToAbortable = require('./abort-controller-fast/funcToAbortable.cjs');
var abortControllerFast_promiseToAbortable = require('./abort-controller-fast/promiseToAbortable.cjs');
var abortControllerFast_useAbortController = require('./abort-controller-fast/useAbortController.cjs');
require('@flemist/time-controller');
require('./promise-fast/PromiseFast.cjs');
require('./custom-promise/rejectAsResolve.cjs');
require('@flemist/abort-controller-fast');
require('tslib');



exports.delay = delay_delay.delay;
exports.CustomPromise = customPromise_CustomPromise.CustomPromise;
exports.combineAbortSignals = abortControllerFast_combineAbortSignals.combineAbortSignals;
exports.funcToAbortable = abortControllerFast_funcToAbortable.funcToAbortable;
exports.promiseToAbortable = abortControllerFast_promiseToAbortable.promiseToAbortable;
exports.useAbortController = abortControllerFast_useAbortController.useAbortController;
