import { __awaiter } from 'tslib';
import '@flemist/abort-controller-fast';
import { CustomPromise } from '../custom-promise/CustomPromise.mjs';
import { promiseToAbortable } from '../abort-controller-fast/promiseToAbortable.mjs';
import '../promise-fast/PromiseFast.mjs';
import '../isPromiseLike.mjs';
import '../custom-promise/rejectAsResolve.mjs';

class Pool {
    constructor(maxSize) {
        this.maxSize = 0;
        this._size = 0;
        this._tickPromise = new CustomPromise();
        if (!maxSize) {
            throw new Error('maxSize should be > 0');
        }
        this.maxSize = maxSize;
        this._size = maxSize;
    }
    get size() {
        return this._size;
    }
    get holdAvailable() {
        return this._size;
    }
    hold(count) {
        const size = this._size;
        if (count > size) {
            count = size;
        }
        if (count > 0) {
            this._size = size - count;
        }
        return count;
    }
    get maxReleaseCount() {
        return this.maxSize - this._size;
    }
    release(count) {
        const size = this._size;
        const maxReleaseCount = this.maxSize - size;
        if (count > maxReleaseCount) {
            count = maxReleaseCount;
        }
        if (count > 0) {
            this._size = size + count;
            if (this._tickPromise) {
                const tickPromise = this._tickPromise;
                this._tickPromise = null;
                tickPromise.resolve();
            }
        }
        return count;
    }
    tick(abortSignal) {
        if (this._size > 0) {
            return;
        }
        if (!this._tickPromise) {
            this._tickPromise = new CustomPromise();
        }
        return promiseToAbortable(abortSignal, this._tickPromise.promise);
    }
    holdWait(count, abortSignal) {
        return __awaiter(this, void 0, void 0, function* () {
            let holdCount = 0;
            try {
                while (true) {
                    holdCount += this.hold(count - holdCount);
                    if (holdCount === count) {
                        return;
                    }
                    yield this.tick(abortSignal);
                }
            }
            catch (err) {
                this.release(holdCount);
                throw err;
            }
        });
    }
}

export { Pool };
