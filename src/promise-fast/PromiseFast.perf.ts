import {calcPerformanceAsync} from 'rdtsc'
import {PromiseFast} from 'src/promise-fast/PromiseFast'
import {rejectAsResolve} from "src/custom-promise";

describe('promise-fast > PromiseFast perf', function () {
  this.timeout(600000)

  it('base', async function () {
    const emptyFunc = o => o
    async function runPromise() {
      // for (let i = 0; i < 20; i++) {
      //   await promise
      // }
      return Promise.resolve('Promise').then(emptyFunc, emptyFunc)
    }

    async function runPromiseFast() {
      // for (let i = 0; i < 20; i++) {
      //   await promiseFast
      // }
      return PromiseFast.resolve('PromiseFast').then(emptyFunc, emptyFunc)
    }

    assert.strictEqual(await runPromise(), 'Promise')
    assert.strictEqual(await runPromiseFast(), 'PromiseFast')

    const result = await calcPerformanceAsync(
      10000,
      () => {

      },
      () => {
        return runPromise()
      },
      () => {
        return runPromiseFast()
      },
    )

    console.log(result)
  })

  it('1 million', async function () {
    await Promise.allSettled(Array.from({length: 2000000}).map((_, i) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          rejectAsResolve(resolve, null)
        }, 0)
      })
    }))
  })
})
