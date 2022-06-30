'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var delay_delay = require('./delay/delay.cjs');
var customPromise_CustomPromise = require('./custom-promise/CustomPromise.cjs');
var abortControllerFast_combineAbortSignals = require('./abort-controller-fast/combineAbortSignals.cjs');
var abortControllerFast_funcToAbortable = require('./abort-controller-fast/funcToAbortable.cjs');
var abortControllerFast_promiseToAbortable = require('./abort-controller-fast/promiseToAbortable.cjs');
var abortControllerFast_useAbortController = require('./abort-controller-fast/useAbortController.cjs');
var customPromise_rejectAsResolve = require('./custom-promise/rejectAsResolve.cjs');
var isPromiseLike = require('./isPromiseLike.cjs');
var objectPool_Pool = require('./object-pool/Pool.cjs');
var objectPool_StackPool = require('./object-pool/StackPool.cjs');
var objectPool_ObjectPool = require('./object-pool/ObjectPool.cjs');
require('@flemist/time-controller');
require('./promise-fast/PromiseFast.cjs');
require('@flemist/abort-controller-fast');
require('tslib');



exports.delay = delay_delay.delay;
exports.CustomPromise = customPromise_CustomPromise.CustomPromise;
exports.combineAbortSignals = abortControllerFast_combineAbortSignals.combineAbortSignals;
exports.funcToAbortable = abortControllerFast_funcToAbortable.funcToAbortable;
exports.promiseToAbortable = abortControllerFast_promiseToAbortable.promiseToAbortable;
exports.useAbortController = abortControllerFast_useAbortController.useAbortController;
exports.promiseRejected = customPromise_rejectAsResolve.promiseRejected;
exports.rejectAsResolve = customPromise_rejectAsResolve.rejectAsResolve;
exports.isPromiseLike = isPromiseLike.isPromiseLike;
exports.Pool = objectPool_Pool.Pool;
exports.StackPool = objectPool_StackPool.StackPool;
exports.ObjectPool = objectPool_ObjectPool.ObjectPool;
