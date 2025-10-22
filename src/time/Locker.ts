import {PromiseOrValue} from 'src/types'
import {isPromiseLike} from 'src/isPromiseLike'

export type LockFunc = <T>(handler: () => PromiseOrValue<T>) => Promise<T>

export interface ILocker {
  lock: LockFunc
}

export class Locker {
  private _lockPromise: null | Promise<void> = null

  async lock<T>(handler: () => PromiseOrValue<T>): Promise<T> {
    if (this._lockPromise) {
      await this._lockPromise
    }
    const promiseOrValue = handler()
    if (isPromiseLike(promiseOrValue)) {
      const promise = promiseOrValue.then(
        () => {
          if (this._lockPromise === promise) {
            this._lockPromise = null
          }
        },
        () => {
          if (this._lockPromise === promise) {
            this._lockPromise = null
          }
        },
      )
      this._lockPromise = promise
    }
    return promiseOrValue
  }
}
