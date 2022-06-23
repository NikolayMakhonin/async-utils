import { __awaiter } from 'tslib';
import { calcPerformanceAsync } from '../test/calcPerformanceAsync.mjs';
import { PromiseFast } from './PromiseFast.mjs';
import 'rdtsc';

describe('promise-fast > PromiseFast', function () {
    this.timeout(600000);
    it('base', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const emptyFunc = o => o;
            function runPromise() {
                return __awaiter(this, void 0, void 0, function* () {
                    // for (let i = 0; i < 20; i++) {
                    //   await promise
                    // }
                    return Promise.resolve('Promise').catch(emptyFunc);
                });
            }
            function runPromiseFast() {
                return __awaiter(this, void 0, void 0, function* () {
                    // for (let i = 0; i < 20; i++) {
                    //   await promiseFast
                    // }
                    return PromiseFast.resolve('PromiseFast').catch(emptyFunc);
                });
            }
            assert.strictEqual(yield runPromise(), 'Promise');
            assert.strictEqual(yield runPromiseFast(), 'PromiseFast');
            const result = yield calcPerformanceAsync(60000, () => {
            }, () => {
                return runPromiseFast();
            }, () => {
                return runPromise();
            });
            console.log(result);
        });
    });
});
