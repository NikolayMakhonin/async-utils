'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var time_Locker = require('./Locker.cjs');
var time_toThrottled = require('./toThrottled.cjs');
require('tslib');
require('../isPromiseLike.cjs');
require('@flemist/abort-controller-fast');
require('@flemist/time-controller');
require('../abort-controller-fast/combineAbortSignals.cjs');
require('../delay/delay.cjs');
require('../custom-promise/rejectAsResolve.cjs');
require('../constants.cjs');



exports.Locker = time_Locker.Locker;
exports.toThrottled = time_toThrottled.toThrottled;
