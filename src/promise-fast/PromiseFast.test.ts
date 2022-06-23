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
  function test({
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
  }) {
    const results: string[] = []
    let resolve: (value: string|Promise<string>) => void
    let reject: (value: string|Promise<string>) => void
    const promise = new Promise((_resolve, _reject) => {
      resolve = (value: string) => {
        _resolve(value)
        _reject('ERROR')
        _resolve('ERROR')
        results.push('resolved: ' + value)
      }
      reject = (value: string) => {
        _reject(value)
        _resolve('ERROR')
        _reject('ERROR')
        results.push('rejected: ' + value)
      }
      results.push('executor')
      if (completeType === CompleteType.resolvedInExecutor) {
        resolve(completeType)
      }
      else if (completeType === CompleteType.rejectedInExecutor) {
        reject(completeType)
      }
    })

    if (completeType === CompleteType.resolvedBeforeThen) {
      resolve(completeType)
    }
    else if (completeType === CompleteType.rejectedBeforeThen) {
      reject(completeType)
    }
    
    function createCallback(name: string, type: CallbackType) {
      switch (type) {
        case CallbackType.null:
          return null
        case CallbackType.value:
          return (value) => {
            results.push(`${name}: ${value}`)
          }
        case CallbackType.throw:
          return (value) => {
            throw `${name}: ${value}`
          }
        case CallbackType.promise:
          return (value) => {
            Promise.resolve(`${name}: ${value}`)
          }
        case CallbackType.promiseRejected:
          return (value) => {
            Promise.reject(`${name}: ${value}`)
          }
        default:
          throw new Error('Unknown CallbackType: ' + type)
      }
    }

    if (thenFulfilled || thenRejected) {
      promise.then(
        createCallback('promise.then onfulfilled', thenFulfilled),
        createCallback('promise.then onrejected', thenRejected),
      )
    }
    if (_catch) {
      promise.catch(
        createCallback('promise.catch', _catch),
      )
    }
    if (_finally) {
      promise.catch(
        createCallback('promise.finally', _finally),
      )
    }
    
    if (completeType === CompleteType.resolvedAfterThen) {
      resolve(completeType)
    }
    else if (completeType === CompleteType.rejectedAfterThen) {
      reject(completeType)
    }
  }
  
  const test = createTestVariants(({
    
  }: {
    
  }) => {
    const checkResults: string[] = []
    const results: string[] = []
    
  })
  
  it('base', function () {
    new PromiseFast()
  })
})
