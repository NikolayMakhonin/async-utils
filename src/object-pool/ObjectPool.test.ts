import {ObjectPool} from 'src/object-pool/ObjectPool'
import {createTestVariants} from '@flemist/test-variants'
import {delay} from 'src/delay'
import {objectPoolAllocate, objectPoolUsing} from 'src/object-pool/helpers'
import {AbortControllerFast, IAbortSignalFast} from '@flemist/abort-controller-fast'
import {Pool} from "src/object-pool/Pool";

describe('object-pool > ObjectPool', function () {
  const testVariants = createTestVariants(async ({
    preAllocateSize,
    abort,
    async,
    maxSize,
  }: {
    preAllocateSize: number,
    abort: boolean,
    async: boolean,
    maxSize: number,
  }) => {
    // console.log({
    //   abort,
    //   async,
    //   maxSize,
    // })

    const objectPool = new ObjectPool<IObject>(new Pool(maxSize))
    const promises: Promise<number>[] = []

    type IObject = {
      id: number
    }

    let objectsCount = 0
    const createObject: () => Promise<IObject>|IObject = async
      ? async function createObject(): Promise<IObject> {
        objectsCount++
        assert.ok(objectsCount <= maxSize)
        await delay(1)
        return {
          id: objectsCount,
        }
      }
      : function createObject(): IObject {
        objectsCount++
        assert.ok(objectsCount <= maxSize)
        return {
          id: objectsCount,
        }
      }

    assert.strictEqual(objectPool.size, 0)
    assert.strictEqual(objectPool.maxSize, maxSize)
    assert.strictEqual(objectPool.available, maxSize)
    if (preAllocateSize !== void 0) {
      await objectPoolAllocate(objectPool, createObject, preAllocateSize)
      assert.strictEqual(objectPool.maxSize, maxSize)
      assert.strictEqual(objectPool.available, maxSize)
      assert.strictEqual(objectPool.size, preAllocateSize == null
        ? maxSize
        : Math.min(maxSize, preAllocateSize))
    }

    const activeObjects = new Set<IObject>()
    function createFunc(result: number) {
      return async
        ? async function func(obj: IObject, abortSignal: IAbortSignalFast) {
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
        : function func(obj: IObject, abortSignal: IAbortSignalFast) {
          if (abort) {
            assert.ok(abortSignal.aborted)
          }

          assert.ok(obj)
          assert.ok(typeof obj.id === 'number')
          assert.ok(obj.id <= maxSize)

          assert.ok(!activeObjects.has(obj))
          assert.ok(activeObjects.size < maxSize)

          return result
        }
    }

    const totalCount = maxSize * 10
    for (let i = 0; i < totalCount; i++) {
      const func = createFunc(i)
      const abortController = abort && new AbortControllerFast()
      if (abortController && !async) {
        abortController.abort(i)
      }
      let promise = objectPoolUsing(objectPool, createObject, func, abortController.signal)
      if (abort) {
        promise = promise.catch(o => o)
      }
      promises.push(promise)
      if (abortController && async) {
        abortController.abort(i)
      }
    }

    const results = await Promise.all(promises)

    assert.strictEqual(objectPool.size, maxSize)
    assert.strictEqual(objectPool.maxSize, maxSize)
    assert.strictEqual(objectPool.available, maxSize)

    for (let i = 0; i < totalCount; i++) {
      assert.strictEqual(results[i], i)
    }
  })

  it('variants', async function () {
    this.timeout(600000)
    await testVariants({
      preAllocateSize: [void 0, null, 0, 1, 2, 9, 10],
      abort          : [false, true],
      async          : [false, true],
      maxSize        : [1, 2, 10],
    })()
  })
})
