import { __awaiter } from 'tslib';
import { calcPerformanceAsync } from '../test/calcPerformanceAsync.mjs';
import { PromiseFast } from './PromiseFast.mjs';
import 'rdtsc';

describe('promise-fast > PromiseFast perf', function () {
    this.timeout(600000);
    it('base', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const emptyFunc = o => o;
            function runPromise() {
                return __awaiter(this, void 0, void 0, function* () {
                    // for (let i = 0; i < 20; i++) {
                    //   await promise
                    // }
                    return Promise.resolve('Promise').then(emptyFunc, emptyFunc);
                });
            }
            function runPromiseFast() {
                return __awaiter(this, void 0, void 0, function* () {
                    // for (let i = 0; i < 20; i++) {
                    //   await promiseFast
                    // }
                    return PromiseFast.resolve('PromiseFast').then(emptyFunc, emptyFunc);
                });
            }
            assert.strictEqual(yield runPromise(), 'Promise');
            assert.strictEqual(yield runPromiseFast(), 'PromiseFast');
            const result = yield calcPerformanceAsync(10000, () => {
            }, () => {
                return runPromise();
            }, () => {
                return runPromiseFast();
            });
            console.log(result);
        });
    });
});
