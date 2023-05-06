'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var customPromise_CustomPromise = require('./CustomPromise.cjs');
var customPromise_rejectAsResolve = require('./rejectAsResolve.cjs');
require('../promise-fast/PromiseFast.cjs');
require('../isPromiseLike.cjs');
require('../promise-fast/promiseSchedulerEnqueue.cjs');
require('tslib');
require('../promise/helpers.cjs');



exports.CustomPromise = customPromise_CustomPromise.CustomPromise;
exports.promiseRejected = customPromise_rejectAsResolve.promiseRejected;
exports.rejectAsResolve = customPromise_rejectAsResolve.rejectAsResolve;
