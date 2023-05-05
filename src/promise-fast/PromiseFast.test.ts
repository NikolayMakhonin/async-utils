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

    function createPromiseRejected(reason: string): Promise<string> {
      if (PromiseClass === Promise) {
        return new PromiseClass((_resolve) => {
          rejectAsResolve(_resolve, reason)
        })
      }
      return PromiseClass.reject(reason)
    }

    // Create promise
    let resolve: (value: string | Promise<string>) => void
    let reject: (value: string | Promise<string>) => void
    let promise: Promise<string>
    if (completeType === CompleteType.resolvedCreate) {
      results.push('create promise: resolvedCreate')
      promise = PromiseClass.resolve(completeType + ' => resolved')
    }
    else if (completeType === CompleteType.rejectedCreate) {
      results.push('create promise: rejectedCreate')
      promise = createPromiseRejected(completeType + ' => rejected')
    }
    else {
      results.push('create promise: executor before')
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
          results.push('executor: resolvedInExecutor')
          resolve(completeType)
        }
        else if (completeType === CompleteType.rejectedInExecutor) {
          results.push('executor: rejectedInExecutor')
          reject(completeType)
        }
      })
      results.push('create promise: executor after')
    }

    // resolve / reject before then
    if (completeType === CompleteType.resolvedBeforeThen) {
      results.push('resolve before then, before')
      resolve(completeType)
      results.push('resolve before then, after')
    }
    else if (completeType === CompleteType.rejectedBeforeThen) {
      results.push('reject before then, before')
      reject(completeType)
      results.push('reject before then, after')
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
      results.push('promise.then before')
      addNextPromise(promise.then(
        createCallback('promise.then onfulfilled', thenFulfilled),
        createCallback('promise.then onrejected', thenRejected),
      ))
      results.push('promise.then after')
    }
    if (_catch) {
      results.push('promise.catch before')
      addNextPromise(promise.catch(
        createCallback('promise.catch', _catch),
      ))
      results.push('promise.catch after')
    }
    if (_finally) {
      results.push('promise.finally before')
      addNextPromise(promise.finally(
        createCallback('promise.finally', _finally) as any,
      ))
      results.push('promise.finally after')
    }

    nextPromises.forEach((nextPromise, i) => {
      results.push('next promise.then before ' + i)
      nextPromise.then(
        (value) => {
          results.push(`${value} => next promise.then onfulfilled ${i}`)
        },
        (value) => {
          results.push(`${value} => next promise.then onrejected ${i}`)
          throw value
        },
      )
      results.push('next promise.then after ' + i)
    })

    if (completeType === CompleteType.resolvedAfterThen) {
      results.push('resolve after then, before')
      resolve(completeType)
      results.push('resolve after then, after')
    }
    else if (completeType === CompleteType.rejectedAfterThen) {
      results.push('reject after then, before')
      reject(completeType)
      results.push('reject after then, after')
    }

    results.push('await before')
    for (let i = 0; i < 10; i++) {
      await Promise.resolve().then(() => {})
    }
    results.push('await after')

    results.push('await next promises before')
    nextPromises.forEach(async (nextPromise, i) => {
      try {
        let value = await nextPromise
        results.push(`${value} => await next promise ${i}`)
      }
      catch (err) {
        results.push(`${err} => await next promise catch ${i}`)
      }
    })
    results.push('await next promises after')

    results.push('await promise before')
    try {
      let value = await promise
      results.push(value + ' => await promise')
    }
    catch (err) {
      results.push(err + ' => await promise catch')
    }
    results.push('await promise after')

    results.push('await last before')
    for (let i = 0; i < 10; i++) {
      await Promise.resolve().then(() => {})
    }
    results.push('await last after')

    return results
  }

  function usingTimeout<TArgs extends any[], TResult>(
    timeout: number,
    func: (...args: TArgs) => TResult|Promise<TResult>,
  ): ((...args: TArgs) => Promise<TResult>) {
    return function (...args) {
      return Promise.race<TResult>([
        Promise.resolve().then(() => func.call(this, ...args)),
        new Promise((resolve) => {
          setTimeout(() => {
            rejectAsResolve(resolve)
          }, timeout)
        }),
      ])
    } as any
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

  it('custom 1', async function () {
    await testVariants({
      completeType : [CompleteType.resolvedCreate],
      thenFulfilled: [CallbackType.promise],
      thenRejected : [null],
      _catch       : [null],
      _finally     : [CallbackType.value],
    })()
  })

  it('base', async function () {
    this.timeout(600000)

    await testVariants({
      _finally: [
        null,
        CallbackType.null,
        CallbackType.throw,
        CallbackType.value,
        CallbackType.promise,
        CallbackType.promiseRejected,
      ],
      completeType : completeTypes,
      thenFulfilled: [null, ...callbackTypes],
      thenRejected : [null, ...callbackTypes],
      _catch       : [null, ...callbackTypes],
    })()
  })
})
