import { __awaiter } from 'tslib';
import { StackPool } from './StackPool.mjs';
import { isPromiseLike } from '../isPromiseLike.mjs';
import { Pool } from './Pool.mjs';
import '@flemist/abort-controller-fast';
import '../custom-promise/CustomPromise.mjs';
import '../promise-fast/PromiseFast.mjs';
import '../custom-promise/rejectAsResolve.mjs';
import '../abort-controller-fast/promiseToAbortable.mjs';

class ObjectPool {
    constructor({ maxSize, pool, availableObjects, holdObjects, destroy, create, }) {
        this._pool = pool || new Pool(maxSize);
        this._availableObjects = availableObjects || new StackPool();
        this._holdObjects = holdObjects === true ? new Set() : holdObjects || null;
        this._create = create;
        this._destroy = destroy;
    }
    get available() {
        return this._pool.size;
    }
    get maxSize() {
        return this._pool.maxSize;
    }
    get availableObjects() {
        return this._availableObjects.objects;
    }
    get holdObjects() {
        return this._holdObjects;
    }
    get() {
        const obj = this._availableObjects.get();
        if (obj != null && this._holdObjects) {
            this._holdObjects.add(obj);
        }
        return obj;
    }
    release(obj) {
        if (obj != null && this._holdObjects) {
            this._holdObjects.delete(obj);
        }
        if (this._pool.maxReleaseCount > 0) {
            if (obj != null) {
                this._availableObjects.release(obj);
            }
            this._pool.release(1);
            return true;
        }
        return false;
    }
    tick(abortSignal) {
        return this._pool.tick();
    }
    getWait(abortSignal) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._pool.holdWait(1, abortSignal);
            return this.get();
        });
    }
    use(func, abortSignal) {
        return __awaiter(this, void 0, void 0, function* () {
            let obj = yield this.getWait(abortSignal);
            if (obj == null && this._create) {
                obj = yield this._create();
                if (this._holdObjects) {
                    this._holdObjects.add(obj);
                }
            }
            try {
                const result = yield func(obj, abortSignal);
                return result;
            }
            finally {
                if (!this.release(obj) && this._destroy) {
                    yield this._destroy(obj);
                }
            }
        });
    }
    allocate(size) {
        if (!this._create) {
            throw new Error('You should specify create function in the constructor');
        }
        const promises = [];
        let tryHoldCount = this._pool.size - this._availableObjects.size;
        if (size != null && size < tryHoldCount) {
            tryHoldCount = size;
        }
        if (tryHoldCount < 0) {
            throw new Error('Unexpected behavior: tryHoldCount < 0');
        }
        const holdCount = this._pool.hold(tryHoldCount);
        for (let i = 0; i < holdCount; i++) {
            const objectOrPromise = this._create();
            if (isPromiseLike(objectOrPromise)) {
                promises.push(objectOrPromise
                    .then(obj => {
                    this.release(obj);
                })
                    .catch(err => {
                    this.release(null);
                    throw err;
                }));
            }
            else {
                this.release(objectOrPromise);
            }
        }
        if (promises.length) {
            return Promise.all(promises);
        }
    }
}

export { ObjectPool };
