import {PromiseFast} from './PromiseFast'
import {createTestVariants} from '@flemist/test-variants'

enum CompleteType {
  resolvedCreate = 'resolvedCreate',
  resolvedInExecutor = 'resolvedInExecutor',
  resolvedBeforeThen = 'resolvedBeforeThen',
  resolvedAfterThen = 'resolvedAfterThen',
  
  rejectedCreate = 'rejectedCreate',
  rejectedInExecutor = 'rejectedInExecutor',
  rejectedBeforeThen = 'rejectedBeforeThen',
  rejectedAfterThen = 'rejectedAfterThen',
}

enum CallbackType {
  null = 'null',
  value = 'value',
  throw = 'throw',
  promise = 'promise',
  promiseRejected = 'promiseRejected',
}

describe('promise-fast > PromiseFast', function () {
  async function calcBehavior({
    PromiseClass,
    completeType,
    thenFulfilled,
    thenRejected,
    _catch,
    _finally,
  }: {
    PromiseClass: typeof Promise,
    completeType: CompleteType,
    thenFulfilled: CallbackType,
    thenRejected: CallbackType,
    _catch: CallbackType,
    _finally: CallbackType,
  }) {
    const results: string[] = []
    let resolve: (value: string | Promise<string>) => void
    let reject: (value: string | Promise<string>) => void
    let promise: Promise<string>
    if (completeType === CompleteType.resolvedCreate) {
      promise = PromiseClass.resolve(completeType + ' => resolved')
    }
    else if (completeType === CompleteType.rejectedCreate) {
      promise = PromiseClass.reject(completeType + ' => rejected')
    }
    else {
      promise = new PromiseClass((_resolve, _reject) => {
        resolve = (value: string) => {
          results.push(value + ' => resolved')
          _resolve(value)
          _reject('ERROR')
          _resolve('ERROR')
        }
        reject = (value: string) => {
          results.push(value + ' => rejected')
          _reject(value)
          _resolve('ERROR')
          _reject('ERROR')
        }
        results.push('executor')
        if (completeType === CompleteType.resolvedInExecutor) {
          resolve(completeType)
        }
        else if (completeType === CompleteType.rejectedInExecutor) {
          reject(completeType)
        }
      })
    }

    if (completeType === CompleteType.resolvedBeforeThen) {
      resolve(completeType)
    }
    else if (completeType === CompleteType.rejectedBeforeThen) {
      reject(completeType)
    }

    function createCallback(name: string, type: CallbackType) {
      switch (type) {
        case null:
        case CallbackType.null:
          return null
        case CallbackType.value:
          return (value) => {
            results.push(`${value} => ${name}`)
          }
        case CallbackType.throw:
          return (value) => {
            throw `${value} => ${name} => throw`
          }
        case CallbackType.promise:
          return (value) => {
            PromiseClass.resolve(`${value} => ${name} => resolve`)
          }
        case CallbackType.promiseRejected:
          return (value) => {
            PromiseClass.reject(`${value} => ${name} => reject`)
          }
        default:
          throw new Error('Unknown CallbackType: ' + type)
      }
    }

    const nextPromises: Promise<any>[] = []

    function addNextPromise(nextPromise: Promise<any>) {
      assert.notStrictEqual(nextPromise, promise)
      assert.strictEqual(nextPromise.constructor, promise.constructor)
      nextPromises.push(nextPromise)
    }

    if (thenFulfilled || thenRejected) {
      addNextPromise(promise.then(
        createCallback('promise.then onfulfilled', thenFulfilled),
        createCallback('promise.then onrejected', thenRejected),
      ))
    }
    if (_catch) {
      addNextPromise(promise.catch(
        createCallback('promise.catch', _catch),
      ))
    }
    if (_finally) {
      addNextPromise(promise.finally(
        createCallback('promise.finally', _finally) as any,
      ))
    }

    for (let i = 0, len = nextPromises.length; i < len; i++) {
      nextPromises[i] = nextPromises[i].then(
        (value) => {
          results.push(`${value} => next promise.then onfulfilled ${i}`)
        },
        (value) => {
          results.push(`${value} => next promise.then onrejected ${i}`)
          throw value
        },
      )
    }

    if (completeType === CompleteType.resolvedAfterThen) {
      resolve(completeType)
    }
    else if (completeType === CompleteType.rejectedAfterThen) {
      reject(completeType)
    }

    for (let i = 0; i < 10; i++) {
      await Promise.resolve().then(() => {
      })
    }

    for (let i = 0, len = nextPromises.length; i < len; i++) {
      try {
        let value = await nextPromises[i]
        results.push(`${value} => await next promise ${i}`)
      }
      catch (err) {
        results.push(`${err} => await next promise catch ${i}`)
      }
    }

    try {
      let value = await promise
      results.push(value + ' => await promise')
    }
    catch (err) {
      results.push(err + ' => await promise catch')
    }

    for (let i = 0; i < 10; i++) {
      await Promise.resolve().then(() => {
      })
    }

    return results
  }

  const testVariants = createTestVariants(async ({
    completeType,
    thenFulfilled,
    thenRejected,
    _catch,
    _finally,
  }: {
    completeType: CompleteType,
    thenFulfilled: CallbackType,
    thenRejected: CallbackType,
    _catch: CallbackType,
    _finally: CallbackType,
  }) => {
    // console.log({
    //   completeType,
    //   thenFulfilled,
    //   thenRejected,
    //   _catch,
    //   _finally,
    // })

    const results: string[] = await calcBehavior({
      PromiseClass: PromiseFast as any,
      completeType,
      thenFulfilled,
      thenRejected,
      _catch,
      _finally,
    })

    const checkResults: string[] = await calcBehavior({
      PromiseClass: Promise,
      completeType,
      thenFulfilled,
      thenRejected,
      _catch,
      _finally,
    })

    assert.deepStrictEqual(
      results.sort(),
      checkResults.sort(),
    )
  })

  it('base', async function () {
    this.timeout(600000)

    await testVariants({
      completeType : Object.values(CompleteType),
      thenFulfilled: [null, ...Object.values(CallbackType)],
      thenRejected : [null, ...Object.values(CallbackType)],
      _catch       : [null, ...Object.values(CallbackType)],
      _finally     : [null, CallbackType.null, CallbackType.value, CallbackType.throw],
    })()
  })
})
