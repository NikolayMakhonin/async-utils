'use strict';

var tslib = require('tslib');
var test_calcPerformanceAsync = require('../test/calcPerformanceAsync.cjs');
var promiseFast_PromiseFast = require('./PromiseFast.cjs');
require('rdtsc');

describe('promise-fast > PromiseFast perf', function () {
    this.timeout(600000);
    it('base', function () {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            const emptyFunc = o => o;
            function runPromise() {
                return tslib.__awaiter(this, void 0, void 0, function* () {
                    // for (let i = 0; i < 20; i++) {
                    //   await promise
                    // }
                    return Promise.resolve('Promise').then(emptyFunc, emptyFunc);
                });
            }
            function runPromiseFast() {
                return tslib.__awaiter(this, void 0, void 0, function* () {
                    // for (let i = 0; i < 20; i++) {
                    //   await promiseFast
                    // }
                    return promiseFast_PromiseFast.PromiseFast.resolve('PromiseFast').then(emptyFunc, emptyFunc);
                });
            }
            assert.strictEqual(yield runPromise(), 'Promise');
            assert.strictEqual(yield runPromiseFast(), 'PromiseFast');
            const result = yield test_calcPerformanceAsync.calcPerformanceAsync(10000, () => {
            }, () => {
                return runPromise();
            }, () => {
                return runPromiseFast();
            });
            console.log(result);
        });
    });
});
