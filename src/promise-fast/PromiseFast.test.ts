import {PromiseFast} from './PromiseFast'
import {createTestVariants} from '@flemist/test-variants'
import {rejectAsResolve} from 'src/custom-promise/rejectAsResolve'

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

    function createPromiseRejected(reason: string): Promise<string> {
      if (PromiseClass === Promise) {
        return new PromiseClass((_resolve) => {
          rejectAsResolve(_resolve, reason)
        })
      }
      return PromiseClass.reject(reason)
    }

    if (completeType === CompleteType.resolvedCreate) {
      promise = PromiseClass.resolve(completeType + ' => resolved')
    }
    else if (completeType === CompleteType.rejectedCreate) {
      promise = createPromiseRejected(completeType + ' => rejected')
    }
    else {
      promise = new PromiseClass((_resolve, _reject) => {
        const __reject = PromiseClass === Promise
          ? (reason) => {
            rejectAsResolve(_resolve, reason)
          }
          : _reject
        // const __reject = _reject

        resolve = (value: string) => {
          results.push(value + ' => resolved')
          _resolve(value)
          __reject('ERROR')
          _resolve('ERROR')
        }
        reject = (value: string) => {
          results.push(value + ' => rejected')
          __reject(value)
          _resolve('ERROR')
          __reject('ERROR')
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
            const result = `${value} => ${name}`
            results.push(result)
            return result
          }
        case CallbackType.throw:
          return (value) => {
            const result = `${value} => ${name} => throw`
            results.push(result)
            throw result
          }
        case CallbackType.promise:
          return (value) => {
            const result = `${value} => ${name} => resolve`
            results.push(result)
            return PromiseClass.resolve(result)
          }
        case CallbackType.promiseRejected:
          return (value) => {
            const result = `${value} => ${name} => reject`
            results.push(result)
            return createPromiseRejected(result)
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

  function usingTimeout<TArgs extends any[], TResult>(
    timeout: number,
    func: (...args: TArgs) => TResult|Promise<TResult>,
  ): ((...args: TArgs) => Promise<TResult>) {
    return function (...args) {
      return Promise.race<TResult>([
        Promise.resolve().then(() => func.call(this, ...args)),
        new Promise((resolve, reject) => {
          setTimeout(reject, timeout)
        }),
      ])
    } as any
  }

  const testVariants = createTestVariants(usingTimeout(10000, async ({
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
  }))


  const completeTypes = [
    CompleteType.resolvedCreate,
    CompleteType.resolvedInExecutor,
    CompleteType.resolvedBeforeThen,
    CompleteType.resolvedAfterThen,

    CompleteType.rejectedCreate,
    CompleteType.rejectedInExecutor,
    CompleteType.rejectedBeforeThen,
    CompleteType.rejectedAfterThen,
  ]

  const callbackTypes = [
    CallbackType.null,
    CallbackType.value,
    CallbackType.throw,
    CallbackType.promise,
    CallbackType.promiseRejected,
  ]

  it('base', async function () {
    this.timeout(600000)

    await testVariants({
      completeType : completeTypes,
      thenFulfilled: [null, ...callbackTypes],
      thenRejected : [null, ...callbackTypes],
      _catch       : [null, ...callbackTypes],
      _finally     : [null, CallbackType.null, CallbackType.value], // , CallbackType.throw],
    })()
  })
})
