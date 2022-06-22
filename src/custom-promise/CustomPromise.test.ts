import {CustomPromise} from './CustomPromise'

describe('custom-promise > CustomPromise', function () {
  it('base', async function () {
    const promise = new CustomPromise()
    promise.resolve('test')
    const value = await promise.promise
    assert.strictEqual(value, 'test')
  })
})
