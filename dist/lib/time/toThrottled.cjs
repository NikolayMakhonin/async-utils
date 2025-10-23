'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var abortControllerFast = require('@flemist/abort-controller-fast');
var timeController = require('@flemist/time-controller');
var abortControllerFast_combineAbortSignals = require('../abort-controller-fast/combineAbortSignals.cjs');
var delay_delay = require('../delay/delay.cjs');
var constants = require('../constants.cjs');
require('../custom-promise/rejectAsResolve.cjs');

function toThrottled({ throttleTimeDefault, throttleTimeMax, func, skipFirst, abortSignal, timeController: timeController$1, }) {
    if (timeController$1 == null) {
        timeController$1 = timeController.timeControllerDefault;
    }
    let timerAbortController = null;
    let timerTargetTime = null;
    let nextCallTime = null;
    let lastCallTime = null;
    let isFirstCall = true;
    let throttleTimeCurrent = null;
    let throttleTimeMaxCurrent = null;
    let lastArgs = null;
    let lastResult = null;
    function updateThrottleTime(throttleTime, _throttleTimeMax) {
        var _a;
        const throttleTimeNew = (_a = throttleTime !== null && throttleTime !== void 0 ? throttleTime : throttleTimeDefault) !== null && _a !== void 0 ? _a : 0;
        throttleTimeCurrent =
            throttleTimeCurrent == null
                ? throttleTimeNew
                : Math.min(throttleTimeCurrent, throttleTimeNew);
        throttleTimeMaxCurrent =
            _throttleTimeMax == null
                ? (throttleTimeMax !== null && throttleTimeMax !== void 0 ? throttleTimeMax : null)
                : _throttleTimeMax === false
                    ? null
                    : _throttleTimeMax;
    }
    function updateNextCallTime() {
        const now = timeController$1.now();
        let newNextCallTime = now + throttleTimeCurrent;
        if (lastCallTime == null) {
            lastCallTime = now;
        }
        if (throttleTimeMaxCurrent != null) {
            newNextCallTime = Math.min(newNextCallTime, lastCallTime + throttleTimeMaxCurrent);
        }
        nextCallTime = newNextCallTime;
        if (timerTargetTime != null && nextCallTime <= timerTargetTime) {
            timerAbortController.abort();
            timerAbortController = null;
            timerTargetTime = null;
        }
        // console.log('[toThrottled]', {
        //   throttleTimeCurrent,
        //   throttleTimeMaxCurrent,
        //   nextCallTime,
        // })
    }
    function update(throttleTime, _throttleTimeMax) {
        updateThrottleTime(throttleTime, _throttleTimeMax);
        updateNextCallTime();
    }
    function getCallTime(now) {
        if (throttleTimeCurrent == null) {
            return null;
        }
        let callTime = nextCallTime !== null && nextCallTime !== void 0 ? nextCallTime : 0;
        const callTimeMax = throttleTimeMaxCurrent == null
            ? null
            : lastCallTime == null
                ? now + throttleTimeMaxCurrent
                : now + Math.max(0, throttleTimeMaxCurrent - (now - lastCallTime));
        if (callTimeMax != null) {
            callTime = Math.min(callTime, callTimeMax);
        }
        return callTime;
    }
    let processPromise = null;
    function _process(abortSignal) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            try {
                while (true) {
                    while (true) {
                        abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.throwIfAborted();
                        const now = timeController$1.now();
                        timerTargetTime = getCallTime(now);
                        if (timerTargetTime == null
                            || timerTargetTime <= timeController$1.now()) {
                            break;
                        }
                        timerAbortController = new abortControllerFast.AbortControllerFast();
                        const timerAbortSignal = abortControllerFast_combineAbortSignals.combineAbortSignals(timerAbortController.signal, abortSignal);
                        yield delay_delay.delay(timerTargetTime - now, timerAbortSignal, timeController$1).catch(constants.EMPTY_FUNC);
                    }
                    if (timerTargetTime == null) {
                        break;
                    }
                    timerTargetTime = null;
                    throttleTimeCurrent = null;
                    nextCallTime = null;
                    if (isFirstCall) {
                        isFirstCall = false;
                        if (skipFirst) {
                            lastCallTime = timeController$1.now();
                            updateNextCallTime();
                            continue;
                        }
                    }
                    try {
                        lastResult = yield func(lastArgs, {
                            abortSignal,
                        });
                    }
                    catch (err) {
                        if (typeof process === 'undefined') {
                            console.error('[toThrottled]', err);
                        }
                        throw err;
                    }
                    finally {
                        lastCallTime = timeController$1.now();
                        updateNextCallTime();
                    }
                }
            }
            finally {
                processPromise = null;
            }
            return lastResult;
        });
    }
    function process(abortSignal) {
        if (!processPromise) {
            processPromise = _process(abortSignal);
        }
        return processPromise;
    }
    return function _throttle(args, options) {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            const { throttleTime, throttleTimeMax: _throttleTimeMax } = options !== null && options !== void 0 ? options : {};
            if (args === false || throttleTime === false) {
                throttleTimeCurrent = null;
                throttleTimeMaxCurrent = throttleTimeMax !== null && throttleTimeMax !== void 0 ? throttleTimeMax : null;
                return processPromise !== null && processPromise !== void 0 ? processPromise : lastResult;
            }
            if (args != null) {
                lastArgs = args;
            }
            update(throttleTime, _throttleTimeMax);
            return process(abortSignal);
        });
    };
}

exports.toThrottled = toThrottled;
