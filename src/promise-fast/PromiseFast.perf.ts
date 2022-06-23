import {calcPerformanceAsync} from 'src/test/calcPerformanceAsync'
import {PromiseFast} from 'src/promise-fast/PromiseFast'

describe('promise-fast > PromiseFast', function () {
  this.timeout(600000)

  it('base', async function () {
    const emptyFunc = o => o
    async function runPromise() {
      // for (let i = 0; i < 20; i++) {
      //   await promise
      // }
      return Promise.resolve('Promise').catch(emptyFunc)
    }

    async function runPromiseFast() {
      // for (let i = 0; i < 20; i++) {
      //   await promiseFast
      // }
      return PromiseFast.resolve('PromiseFast').catch(emptyFunc)
    }

    assert.strictEqual(await runPromise(), 'Promise')
    assert.strictEqual(await runPromiseFast(), 'PromiseFast')

    const result = await calcPerformanceAsync(
      10000,
      () => {

      },
      () => {
        return runPromiseFast()
      },
      () => {
        return runPromise()
      },
    )

    console.log(result)
  })
})
