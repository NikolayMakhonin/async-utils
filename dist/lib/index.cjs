'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var promiseFast_PromiseFast = require('./promise-fast/PromiseFast.cjs');
var customPromise_CustomPromise = require('./custom-promise/CustomPromise.cjs');
var delay_delay = require('./delay/delay.cjs');
require('@flemist/time-controller');



exports.PromiseFast = promiseFast_PromiseFast.PromiseFast;
exports.CustomPromise = customPromise_CustomPromise.CustomPromise;
exports.delay = delay_delay.delay;
