'use strict';

var tslib = require('tslib');
var rdtsc = require('rdtsc');
var constants = require('../constants.cjs');

describe('waitMicrotasks perf', () => {
    it('setImmediate', function () {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            this.timeout(60 * 60 * 1000);
            const result = yield rdtsc.calcPerformanceAsync({
                time: 1000,
                funcs: [
                    () => tslib.__awaiter(this, void 0, void 0, function* () {
                        for (let i = 0; i < 16; i++) {
                            yield Promise.resolve().then(constants.EMPTY_FUNC);
                        }
                    }),
                    // () => {
                    //   return waitMicrotasks()
                    // },
                    () => {
                        return new Promise(resolve => {
                            setImmediate(resolve);
                        });
                    },
                ],
            });
            console.log(result);
        });
    });
});
