import { __awaiter } from 'tslib';
import { AbortControllerFast } from '@flemist/abort-controller-fast';
import { timeControllerDefault } from '@flemist/time-controller';
import { combineAbortSignals } from '../abort-controller-fast/combineAbortSignals.mjs';
import { delay } from '../delay/delay.mjs';
import { EMPTY_FUNC } from '../constants.mjs';
import '../custom-promise/rejectAsResolve.mjs';

function toThrottled({ throttleTimeDefault, throttleTimeMax, func, skipFirst, abortSignal, timeController, }) {
    if (timeController == null) {
        timeController = timeControllerDefault;
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
        const now = timeController.now();
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
        return __awaiter(this, void 0, void 0, function* () {
            try {
                while (true) {
                    while (true) {
                        abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.throwIfAborted();
                        const now = timeController.now();
                        timerTargetTime = getCallTime(now);
                        if (timerTargetTime == null
                            || timerTargetTime <= timeController.now()) {
                            break;
                        }
                        timerAbortController = new AbortControllerFast();
                        const timerAbortSignal = combineAbortSignals(timerAbortController.signal, abortSignal);
                        yield delay(timerTargetTime - now, timerAbortSignal, timeController).catch(EMPTY_FUNC);
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
                            lastCallTime = timeController.now();
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
                        lastCallTime = timeController.now();
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
        return __awaiter(this, void 0, void 0, function* () {
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

export { toThrottled };
