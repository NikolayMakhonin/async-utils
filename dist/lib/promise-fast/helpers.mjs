import { isPromiseLike } from '../isPromiseLike.mjs';

function promiseAll(values, PromiseClass) {
    if (!PromiseClass) {
        PromiseClass = Promise;
    }
    let resolve;
    let reject;
    const promise = new PromiseClass((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
    });
    let count = values.length;
    const results = [];
    values.forEach((value, i) => {
        if (isPromiseLike(value)) {
            value.then((result) => {
                results[i] = result;
                if (--count === 0) {
                    resolve(results);
                }
            }, reject);
        }
        else {
            results[i] = value;
            if (--count === 0) {
                resolve(results);
            }
        }
    });
    return promise;
}
function promiseAllSettled(values, PromiseClass) {
    if (!PromiseClass) {
        PromiseClass = Promise;
    }
    let resolve;
    const promise = new PromiseClass((_resolve, _reject) => {
        resolve = _resolve;
    });
    let count = values.length;
    const results = [];
    values.forEach((value, i) => {
        if (isPromiseLike(value)) {
            value.then((result) => {
                results[i] = { status: 'fulfilled', value: result };
                if (--count === 0) {
                    resolve(results);
                }
            }, (reason) => {
                results[i] = { status: 'rejected', reason };
                if (--count === 0) {
                    resolve(results);
                }
            });
        }
        else {
            results[i] = { status: 'fulfilled', value };
            if (--count === 0) {
                resolve(results);
            }
        }
    });
    return promise;
}
function promiseAny(values, PromiseClass) {
    if (!PromiseClass) {
        PromiseClass = Promise;
    }
    let resolve;
    let reject;
    const promise = new PromiseClass((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
    });
    let count = values.length;
    const errors = [];
    values.forEach((value, i) => {
        if (isPromiseLike(value)) {
            value.then(resolve, (reason) => {
                errors[i] = reason;
                if (--count === 0) {
                    reject(new AggregateError(errors));
                }
            });
        }
        else {
            resolve(value);
        }
    });
    return promise;
}
function promiseRace(values, PromiseClass) {
    if (!PromiseClass) {
        PromiseClass = Promise;
    }
    let resolve;
    let reject;
    const promise = new PromiseClass((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
    });
    values.forEach((value) => {
        if (isPromiseLike(value)) {
            value.then(resolve, reject);
        }
        else {
            resolve(value);
        }
    });
    return promise;
}

export { promiseAll, promiseAllSettled, promiseAny, promiseRace };
