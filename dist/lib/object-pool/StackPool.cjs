'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class StackPool {
    constructor() {
        this._objects = [];
    }
    get objects() {
        return this._objects;
    }
    get size() {
        return this._objects.length;
    }
    get() {
        const lastIndex = this._objects.length - 1;
        if (lastIndex >= 0) {
            const obj = this._objects[lastIndex];
            this._objects.length = lastIndex;
            return obj;
        }
        return null;
    }
    release(obj) {
        if (obj == null) {
            throw new Error('object should not be null');
        }
        this._objects.push(obj);
    }
}

exports.StackPool = StackPool;
