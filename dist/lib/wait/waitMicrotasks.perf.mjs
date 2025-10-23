import { __awaiter } from 'tslib';
import { calcPerformanceAsync } from 'rdtsc';
import { EMPTY_FUNC } from '../constants.mjs';

describe('waitMicrotasks perf', () => {
    it('setImmediate', function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeout(60 * 60 * 1000);
            const result = yield calcPerformanceAsync({
                time: 1000,
                funcs: [
                    () => __awaiter(this, void 0, void 0, function* () {
                        for (let i = 0; i < 16; i++) {
                            yield Promise.resolve().then(EMPTY_FUNC);
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
