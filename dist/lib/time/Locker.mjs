import { __awaiter } from 'tslib';
import { isPromiseLike } from '../isPromiseLike.mjs';

class Locker {
    constructor() {
        this._lockPromise = null;
    }
    lock(handler) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._lockPromise) {
                yield this._lockPromise;
            }
            const promiseOrValue = handler();
            if (isPromiseLike(promiseOrValue)) {
                const promise = promiseOrValue.then(() => {
                    if (this._lockPromise === promise) {
                        this._lockPromise = null;
                    }
                }, () => {
                    if (this._lockPromise === promise) {
                        this._lockPromise = null;
                    }
                });
                this._lockPromise = promise;
            }
            return promiseOrValue;
        });
    }
}

export { Locker };
