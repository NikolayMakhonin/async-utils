import {CustomPromise} from './CustomPromise'
import {createTestVariants} from '@flemist/test-variants'

describe('custom-promise > CustomPromise', function () {
  it('base', async function () {
    const promise = new CustomPromise()
    promise.resolve('test')
    const value = await promise.promise
    assert.strictEqual(value, 'test')
  })
})

xdescribe('custom-promise > CustomPromise > million of Promise reject', function () {
  let millionRejectTime = 0
  it('step 1', async function () {
    this.timeout(600000)

    console.log('wait 5 sec')
    await new Promise((resolve) => {
      setTimeout(resolve, 5000)
    })
    console.log('start')
    await new Promise((resolve) => {
      setTimeout(resolve, 1000)
    })

    async function promiseRejectedFunc() {
      await Promise.resolve()
      throw 0
    }

    await createTestVariants(async ({
      a,
      b,
      c,
      d,
      e,
      f,
    }: {
      a: number,
      b: number,
      c: number,
      d: number,
      e: number,
      f: number,
    }) => {
      const promise = new CustomPromise()
      promise.reject('err')
      await promise.promise
        .then(o => {}, o => {})
    })({
      a: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      b: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      c: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      d: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      e: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      f: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    })()

    console.log('try delay')
    for (let i = 0; i < 100; i++) {
      const time0 = Date.now()
      await new Promise(resolve => {
        setTimeout(resolve, 0)
      })
      const time = Date.now() - time0
      assert.ok(time < 1000, 'delay real time: ' + time)
    }

    millionRejectTime = Date.now()
  })

  it('step 2', function () {
    const now = Date.now()
    assert.ok(millionRejectTime > 0)
    assert.ok(now - millionRejectTime < 500, (now - millionRejectTime) + '')
    console.log('millionRejectTime: ' + (now - millionRejectTime))
  })
})
