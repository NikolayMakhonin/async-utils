'use strict';

var tslib = require('tslib');

describe('promise-fast > PromiseFast perf', function () {
    this.timeout(60 * 60 * 1000);
    // it('base', async function () {
    //   const emptyFunc = o => o
    //   async function runPromise() {
    //     // for (let i = 0; i < 20; i++) {
    //     //   await promise
    //     // }
    //     return Promise.resolve('Promise').then(emptyFunc, emptyFunc)
    //   }
    //
    //   async function runPromiseFast() {
    //     // for (let i = 0; i < 20; i++) {
    //     //   await promiseFast
    //     // }
    //     return PromiseFast.resolve('PromiseFast').then(emptyFunc, emptyFunc)
    //   }
    //
    //   assert.strictEqual(await runPromise(), 'Promise')
    //   assert.strictEqual(await runPromiseFast(), 'PromiseFast')
    //
    //   const result = await calcPerformanceAsync(
    //     10000,
    //     () => {
    //
    //     },
    //     () => {
    //       return runPromise()
    //     },
    //     () => {
    //       return runPromiseFast()
    //     },
    //   )
    //
    //   console.log(result)
    // })
    it('1 million', function () {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            // less than 450 bytes per each PromiseFast instance
            // less than 69 bytes per each Promise instance
            const promises = Array.from({ length: 62000000 }).map((_, i) => {
                let resolve;
                const promise = new Promise((_resolve, _reject) => {
                    resolve = _resolve;
                    // setTimeout(() => {
                    //   rejectAsResolve(resolve, null)
                    // }, 0)
                });
                resolve(null);
                return promise;
            });
            console.log('await PromiseFast.all()');
            yield Promise.all(promises);
            console.log('COMPLETED');
        });
    });
});
