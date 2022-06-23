/* eslint-disable node/no-sync */
// noinspection JSConstantReassignment

export type PromiseLikeOrValue<TValue> = PromiseLike<TValue> | TValue
export type OnFulfilled<TValue, TResult = any> = (value: TValue) => PromiseLikeOrValue<TResult>
export type OnRejected<TResult> = (reason: any) => PromiseLikeOrValue<TResult>
export type Resolve<TValue> = (value: PromiseLikeOrValue<TValue>) => void
export type Reject = (reason?: any) => void
export type Executor<TValue> = (resolve: Resolve<TValue>, reject: Reject) => void
export type Status = 'pending' | 'fulfilled' | 'rejected'

function isPromiseLike<TValue>(
  obj: TValue,
): TValue extends PromiseLike<any> ? true : false {
  if (
    obj != null
    && typeof obj === 'object'
    && typeof (obj as any).then === 'function'
  ) {
    return true as any
  }
  return false as any
}

function callFulfill<TValue>(
  value: TValue,
  fulfill: OnFulfilled<TValue>,
  nextPromise: PromiseFast<any>,
) {
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
}

function callReject(
  reason: any,
  reject: OnRejected<any>,
  nextPromise: PromiseFast<any>,
) {
  try {
    const result = reject
      ? reject(reason)
      : reason
    // @ts-expect-error
    nextPromise._resolve(result)
  }
  catch (err) {
    // @ts-expect-error
    nextPromise._reject(err)
  }
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

    this._resolve = (value) => {
      resolve.call(this, value)
    }
    this._reject = (reason) => {
      reject.call(this, reason)
    }
    this._resolveAsync = (value) => {
      resolveAsync.call(this, value)
    }
    this._rejectAsync = (reason) => {
      rejectAsync.call(this, reason)
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
      (value as PromiseLike<TValue>).then(this._resolveAsync, this._rejectAsync)
      return
    }

    this._resolveSync(value as TValue)
  }

  private _resolveSync(value: TValue) {
    const handlers = this._handlers
    // @ts-expect-error
    this.value = value
    if (handlers != null) {
      this._handlers = null
      for (let i = 0, len = handlers.length; i < len; i++) {
        const [fulfill, , nextPromise] = handlers[i]
        callReject(value, fulfill, nextPromise)
      }
    }
  }

  private _reject(reason: PromiseLikeOrValue<any>) {
    if (this.status !== 'pending') {
      return
    }
    // @ts-expect-error
    this.status = 'rejected'
    this._rejectAsync(reason)
  }

  private _rejectAsync(reason: PromiseLikeOrValue<any>) {
    if (isPromiseLike(reason)) {
      (reason as PromiseLike<any>).then(this._rejectAsync, this._rejectAsync)
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
      callReject(this.value, onrejected, nextPromise)
    }
    return nextPromise
  }

  catch<TResult = never>(
    onrejected?: OnRejected<TResult> | undefined | null,
  ): Promise<TValue | TResult> {
    return this.then(void 0, onrejected)
  }

  finally(onfinally?: (() => void) | undefined | null): Promise<TValue> {
    const _onfinally = o => {
      onfinally()
      return o
    }
    return this.then(_onfinally, _onfinally)
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
}
