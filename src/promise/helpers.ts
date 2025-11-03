import {isPromiseLike} from 'src/isPromiseLike'
import {Reject, Resolve} from 'src/promise-fast/PromiseFast'
import {PromiseConstructorBase} from 'src/promise/contracts'
import {PromiseLikeOrValue, PromiseOrValue} from 'src/types'

export function promiseAll<T>(
  values: readonly (T | PromiseLike<T>)[],
  PromiseClass?: PromiseConstructorBase,
): Promise<T[]> {
  if (!PromiseClass) {
    PromiseClass = Promise
  }
  let resolve: Resolve<T[]>
  let reject: Reject
  const promise = new PromiseClass<T[]>((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  })
  let count = values.length
  const results: T[] = []
  values.forEach((value, i) => {
    if (isPromiseLike(value)) {
      value.then((result) => {
        results[i] = result
        if (--count === 0) {
          resolve(results)
        }
      }, reject)
    }
    else {
      results[i] = value
      if (--count === 0) {
        resolve(results)
      }
    }
  })
  return promise
}

export function promiseAllSettled<T>(
  values: readonly (T | PromiseLike<T>)[],
  PromiseClass?: PromiseConstructorBase,
): Promise<PromiseSettledResult<T>[]> {
  if (!PromiseClass) {
    PromiseClass = Promise
  }
  let resolve: Resolve<PromiseSettledResult<T>[]>
  const promise = new PromiseClass<PromiseSettledResult<T>[]>((_resolve, _reject) => {
    resolve = _resolve
  })
  let count = values.length
  const results: PromiseSettledResult<T>[] = []
  values.forEach((value, i) => {
    if (isPromiseLike(value)) {
      value.then((result) => {
        results[i] = {status: 'fulfilled', value: result}
        if (--count === 0) {
          resolve(results)
        }
      }, (reason) => {
        results[i] = {status: 'rejected', reason}
        if (--count === 0) {
          resolve(results)
        }
      })
    }
    else {
      results[i] = {status: 'fulfilled', value}
      if (--count === 0) {
        resolve(results)
      }
    }
  })
  return promise
}

export function promiseAny<T>(
  values: readonly (T | PromiseLike<T>)[],
  PromiseClass?: PromiseConstructorBase,
): Promise<T> {
  if (!PromiseClass) {
    PromiseClass = Promise
  }
  let resolve: Resolve<T>
  let reject: Reject
  const promise = new PromiseClass<T>((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  })
  let count = values.length
  const errors: any[] = []
  values.forEach((value, i) => {
    if (isPromiseLike(value)) {
      value.then(resolve, (reason) => {
        errors[i] = reason
        if (--count === 0) {
          reject(new AggregateError(errors))
        }
      })
    }
    else {
      resolve(value)
    }
  })
  return promise
}

export function promiseRace<T>(
  values: readonly (T | PromiseLike<T>)[],
  PromiseClass?: PromiseConstructorBase,
): Promise<T> {
  if (!PromiseClass) {
    PromiseClass = Promise
  }
  let resolve: Resolve<T>
  let reject: Reject
  const promise = new PromiseClass<T>((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  })
  values.forEach((value) => {
    if (isPromiseLike(value)) {
      value.then(resolve, reject)
    }
    else {
      resolve(value)
    }
  })
  return promise
}

export function promiseLikeToPromise<T>(
  value: PromiseLike<T> | Promise<T>,
): Promise<T>
export function promiseLikeToPromise<T>(
  value: PromiseLikeOrValue<T> | PromiseOrValue<T>,
): PromiseOrValue<T>
export function promiseLikeToPromise<T>(
  value: T,
): T
export function promiseLikeToPromise<T>(
  value: PromiseLikeOrValue<T> | PromiseOrValue<T>,
): PromiseOrValue<T> {
  if (value instanceof Promise) {
    return value
  }
  if (isPromiseLike(value)) {
    return new Promise((resolve, reject) => {
      value.then(resolve, reject)
    })
  }
  return value
}
