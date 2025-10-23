'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var wait_waitMicrotasks = require('./waitMicrotasks.cjs');
var wait_waitTimeControllerMock = require('./waitTimeControllerMock.cjs');
require('setimmediate');
require('../isPromiseLike.cjs');
require('../abort-controller-fast/abortSignalToPromise.cjs');
require('@flemist/abort-controller-fast');
require('tslib');
require('../constants.cjs');



exports.waitMicrotasks = wait_waitMicrotasks.waitMicrotasks;
exports.waitTimeControllerMock = wait_waitTimeControllerMock.waitTimeControllerMock;
