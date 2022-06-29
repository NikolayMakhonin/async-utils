'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib = require('tslib');
var isPromiseLike = require('../isPromiseLike.cjs');

function objectPoolWait(objectPool, abortSignal) {
    return tslib.__awaiter(this, void 0, void 0, function* () {
        while (objectPool.available <= 0) {
            yield objectPool.tick();
        }
        return objectPool.get();
    });
}
function objectPoolUsing(objectPool, createObject, func, abortSignal) {
    return tslib.__awaiter(this, void 0, void 0, function* () {
        let obj = yield objectPoolWait(objectPool);
        if (obj == null) {
            obj = yield createObject();
        }
        try {
            const result = yield func(obj, abortSignal);
            return result;
        }
        finally {
            objectPool.release(obj);
        }
    });
}
function objectPoolAllocate(objectPool, createObject, size) {
    const promises = [];
    let deferSize = 0;
    while (objectPool.size < objectPool.available
        && (size == null || objectPool.size + deferSize < size)) {
        const nullObject = objectPool.get();
        if (nullObject != null) {
            throw new Error('Unexpected behavior');
        }
        const objectOrPromise = createObject();
        if (isPromiseLike.isPromiseLike(objectOrPromise)) {
            deferSize++;
            promises.push(objectOrPromise
                .then(obj => {
                objectPool.release(obj);
            })
                .catch(err => {
                objectPool.release(null);
                throw err;
            }));
        }
        else {
            objectPool.release(objectOrPromise);
        }
    }
    if (promises.length) {
        return Promise.all(promises);
    }
}

exports.objectPoolAllocate = objectPoolAllocate;
exports.objectPoolUsing = objectPoolUsing;
exports.objectPoolWait = objectPoolWait;
