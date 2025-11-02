import { __awaiter } from 'tslib';
import { waitMicrotasks } from './waitMicrotasks.mjs';
import { isPromiseLike } from '../isPromiseLike.mjs';
import { promiseToAbortSignal } from '../abort-controller-fast/abortSignalToPromise.mjs';
import { EMPTY_FUNC } from '../constants.mjs';
import 'setimmediate';
import '@flemist/abort-controller-fast';

function waitTimeControllerMock(timeControllerMock, abortSignalOrPromise, options) {
    return __awaiter(this, void 0, void 0, function* () {
        let promise;
        let abortSignal;
        if (isPromiseLike(abortSignalOrPromise)) {
            promise = abortSignalOrPromise;
            abortSignal = promiseToAbortSignal(promise);
        }
        else {
            promise = null;
            abortSignal = abortSignalOrPromise;
        }
        const endTime = (options === null || options === void 0 ? void 0 : options.timeout) == null ? null : timeControllerMock.now() + options.timeout;
        while (true) {
            if ((options === null || options === void 0 ? void 0 : options.awaitsPerIteration) != null) {
                for (let i = 0, len = options.awaitsPerIteration; i < len; i++) {
                    yield Promise.resolve().then(EMPTY_FUNC);
                    if (abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.aborted) {
                        break;
                    }
                }
            }
            else {
                yield waitMicrotasks(abortSignal).catch(EMPTY_FUNC);
            }
            if (abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.aborted) {
                break;
            }
            if (endTime != null && timeControllerMock.now() >= endTime) {
                break;
            }
            let nextTime = timeControllerMock.nextQueuedTime;
            if (nextTime == null && !promise) {
                break;
            }
            if (nextTime == null || endTime != null && nextTime > endTime) {
                nextTime = endTime;
            }
            if (nextTime != null) {
                timeControllerMock.setTime(nextTime);
            }
        }
        return promise !== null && promise !== void 0 ? promise : void 0;
    });
}

export { waitTimeControllerMock };
