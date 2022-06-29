import {ObjectPool} from 'src/object-pool/ObjectPool'
import {createTestVariants} from '@flemist/test-variants'
import {delay} from 'src/delay'
import {objectPoolUsing} from 'src/object-pool/helpers'
import {AbortControllerFast, IAbortSignalFast} from '@flemist/abort-controller-fast'

describe('object-pool > ObjectPool', function () {
  const testVariants = createTestVariants(async ({
    abort,
    async,
    maxSize,
  }: {
    abort: boolean,
    async: boolean,
    maxSize: number,
  }) => {
    const objectPool = new ObjectPool(maxSize)
    const promises: Promise<number>[] = []

    type IObject = {
      id: number
    }

    let objectsCount = 0
    function createObject(): IObject {
      objectsCount++
      assert.ok(objectsCount <= maxSize)
      return {
        id: objectsCount,
      }
    }

    const activeObjects = new Set<IObject>()
    function createFunc(result: number) {
      return async
        ? async function func(obj: any, abortSignal: IAbortSignalFast) {
          if (abort) {
            assert.ok(!abortSignal.aborted)
          }

          assert.ok(obj)
          assert.ok(typeof obj.id === 'number')
          assert.ok(obj.id <= maxSize)

          assert.ok(!activeObjects.has(obj))
          activeObjects.add(obj)
          assert.ok(activeObjects.size <= maxSize)

          await delay(1)

          if (abort) {
            assert.ok(abortSignal.aborted)
          }

          assert.ok(activeObjects.has(obj))
          activeObjects.delete(obj)
          assert.ok(activeObjects.size < maxSize)

          return result
        }
        : function func(obj: any, abortSignal: IAbortSignalFast) {
          if (abort) {
            assert.ok(abortSignal.aborted)
          }

          assert.ok(obj)
          assert.ok(typeof obj.id === 'number')
          assert.ok(obj.id <= maxSize)

          assert.ok(!activeObjects.has(obj))
          assert.ok(activeObjects.size < maxSize)

          return obj
        }
    }

    const totalCount = maxSize * 10
    for (let i = 0; i < totalCount; i++) {
      const func = createFunc(i)
      const abortController = abort && new AbortControllerFast()
      if (abortController && !async) {
        abortController.abort(i)
      }
      let promise = objectPoolUsing(objectPool, func, abortController.signal)
      if (abort) {
        promise = promise.catch(o => o)
      }
      promises.push(promise)
      if (abortController && async) {
        abortController.abort(i)
      }
    }

    const results = await Promise.all(promises)
    for (let i = 0; i < totalCount; i++) {
      assert.strictEqual(results[i], i)
    }
  })

  it('variants', async function () {
    await testVariants({
      abort  : [false, true],
      async  : [false, true],
      maxSize: [1, 2, 10],
    })()
  })
})
