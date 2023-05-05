/* eslint-disable node/no-sync */
// noinspection JSConstantReassignment

import {isPromiseLike} from 'src/isPromiseLike'
import {promiseSchedulerEnqueue} from 'src/promise-fast/promiseSchedulerEnqueue'

export type PromiseLikeOrValue<TValue> = PromiseLike<TValue> | TValue
export type OnFulfilled<TValue, TResult = any> = (value: TValue) => PromiseLikeOrValue<TResult>
export type OnRejected<TResult> = (reason: any) => PromiseLikeOrValue<TResult>
export type Resolve<TValue> = (value: PromiseLikeOrValue<TValue>) => void
export type Reject = (reason?: any) => void
export type Executor<TValue> = (resolve: Resolve<TValue>, reject: Reject) => void
export type Status = 'pending' | 'fulfilled' | 'rejected'

function callFulfill<TValue>(
  value: TValue,
  fulfill: OnFulfilled<TValue>,
  nextPromise: PromiseFast<any>,
) {
  promiseSchedulerEnqueue(() => {
    try {
      const result = fulfill
        ? fulfill(value)
        : value
      // @ts-expect-error
      nextPromise._resolve(result)
    }
    catch (err) {
      // @ts-expect-error
      nextPromise._reject(err)
    }
  })
}

function callReject(
  reason: any,
  reject: OnRejected<any>,
  nextPromise: PromiseFast<any>,
) {
  promiseSchedulerEnqueue(() => {
    if (!reject) {
      // @ts-expect-error
      nextPromise._reject(reason)
    }

    try {
      const result = reject(reason)
      // @ts-expect-error
      nextPromise._resolve(result)
    }
    catch (err) {
      // @ts-expect-error
      nextPromise._reject(err)
    }
  })
}

const emptyFunc = function emptyFunc() {}

export class PromiseFast<TValue> implements Promise<TValue> {
  readonly status: Status = 'pending'
  readonly value: TValue = void 0
  readonly reason: any = void 0
  private _handlers: [fulfill: OnFulfilled<TValue>, reject: OnRejected<any>, nextPromise: PromiseFast<any>][] = null

  constructor(executor: Executor<TValue>) {
    const resolve = this._resolve
    const reject = this._reject
    const resolveAsync = this._resolveAsync
    const rejectAsync = this._rejectAsync

    const _this = this

    this._resolve = function _resolve(value) {
      resolve.call(_this, value)
    }
    this._reject = function _reject(reason) {
      reject.call(_this, reason)
    }
    this._resolveAsync = function _resolveAsync(value) {
      resolveAsync.call(_this, value)
    }
    this._rejectAsync = function _rejectAsync(reason) {
      rejectAsync.call(_this, reason)
    }

    executor(this._resolve, this._reject)
  }

  private _resolve(value: PromiseLikeOrValue<TValue>) {
    if (this.status !== 'pending') {
      return
    }
    // @ts-expect-error
    this.status = 'fulfilled'
    this._resolveAsync(value)
  }

  private _resolveAsync(value: PromiseLikeOrValue<TValue>) {
    if (isPromiseLike(value)) {
      value.then(this._resolveAsync, this._rejectAsync)
      return
    }

    this._resolveSync(value)
  }

  private _resolveSync(value: TValue) {
    const handlers = this._handlers
    // @ts-expect-error
    this.value = value
    if (handlers != null) {
      this._handlers = null
      for (let i = 0, len = handlers.length; i < len; i++) {
        const [fulfill, , nextPromise] = handlers[i]
        callFulfill(value, fulfill, nextPromise)
      }
    }
  }

  private _reject(reason: PromiseLikeOrValue<any>) {
    if (this.status !== 'pending') {
      return
    }
    this._rejectAsync(reason)
  }

  private _rejectAsync(reason: PromiseLikeOrValue<any>) {
    // @ts-expect-error
    this.status = 'rejected'
    if (isPromiseLike(reason)) {
      (reason).then(this._rejectAsync, this._rejectAsync)
      return
    }

    this._rejectSync(reason)
  }

  private _rejectSync(reason: any) {
    const handlers = this._handlers
    // @ts-expect-error
    this.reason = reason
    if (handlers != null) {
      this._handlers = null
      for (let i = 0, len = handlers.length; i < len; i++) {
        const [, reject, nextPromise] = handlers[i]
        callReject(reason, reject, nextPromise)
      }
    }
  }

  then<TResult1 = TValue, TResult2 = never>(
    onfulfilled?: OnFulfilled<TValue, TResult1> | undefined | null,
    onrejected?: OnFulfilled<TValue, TResult2> | undefined | null,
  ): Promise<TResult1 | TResult2> {
    const nextPromise = new PromiseFast<TResult1 | TResult2>(emptyFunc)
    if (this.status === 'pending') {
      if (this._handlers == null) {
        this._handlers = []
      }
      this._handlers.push([onfulfilled, onrejected, nextPromise])
    }
    else if (this.status === 'fulfilled') {
      callFulfill(this.value, onfulfilled, nextPromise)
    }
    else {
      callReject(this.reason, onrejected, nextPromise)
    }
    return nextPromise
  }

  catch<TResult = never>(
    onrejected?: OnRejected<TResult> | undefined | null,
  ): Promise<TValue | TResult> {
    return this.then(void 0, onrejected)
  }

  finally(onfinally?: (() => PromiseLike<void>|void) | undefined | null): Promise<TValue> {
    const onfulfilled = onfinally && (function _onfulfilled(o) {
      const result = onfinally()
      if (isPromiseLike(result)) {
        return result.then(() => o)
      }
      return PromiseFast.resolve(o)
    })
    const onrejected = onfinally && (function _onrejected(o) {
      const result = onfinally()
      if (isPromiseLike(result)) {
        return result.then(() => PromiseFast.reject(o))
      }
      return PromiseFast.reject(o)
    })
    return this.then(onfulfilled, onrejected)
  }

  static resolve<TValue>(value: PromiseLikeOrValue<TValue>) {
    const promise = new PromiseFast<TValue>(emptyFunc)
    promise._resolve(value)
    return promise
  }

  static reject(reason: PromiseLikeOrValue<any>) {
    const promise = new PromiseFast<never>(emptyFunc)
    promise._reject(reason)
    return promise
  }

  get [Symbol.toStringTag]() {
    return 'Promise'
  }

  static all<T>(values: readonly (T | PromiseLike<T>)[]): Promise<T[]> {
    let resolve: Resolve<T[]>
    let reject: Reject
    const promise = new PromiseFast<T[]>((_resolve, _reject) => {
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

  static allSettled<T>(values: readonly (T | PromiseLike<T>)[]): PromiseFast<PromiseSettledResult<T>[]> {
    let resolve: Resolve<PromiseSettledResult<T>[]>
    const promise = new PromiseFast<PromiseSettledResult<T>[]>((_resolve, _reject) => {
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

  static any<T>(values: readonly (T | PromiseLike<T>)[]): PromiseFast<T> {
    let resolve: Resolve<T>
    let reject: Reject
    const promise = new PromiseFast<T>((_resolve, _reject) => {
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

  static race<T>(values: readonly (T | PromiseLike<T>)[]): PromiseFast<T> {
    let resolve: Resolve<T>
    let reject: Reject
    const promise = new PromiseFast<T>((_resolve, _reject) => {
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
}
