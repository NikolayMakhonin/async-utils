import {IObjectPool} from './contracts'
import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {promiseToAbortable} from 'src/abort-controller-fast'
import {CustomPromise} from 'src/custom-promise'

export class ObjectPool<TObject> implements IObjectPool<TObject> {
  readonly maxSize: number = 0
  private _available: number = 0
  private readonly _stack: TObject[] = []

  constructor(maxSize: number) {
    if (!maxSize) {
      throw new Error('maxSize should be > 0')
    }
    this.maxSize = maxSize
    this._available = maxSize
  }

  get size() {
    return this._stack.length
  }

  get available() {
    return this._available
  }

  get(): TObject {
    const lastIndex = this._available - 1
    if (lastIndex >= 0) {
      this._available--
      if (lastIndex >= this._stack.length) {
        return null
      }
      const obj = this._stack[lastIndex]
      this._stack.length = lastIndex
      return obj
    }

    return null
  }

  release(obj: TObject) {
    if (this._stack.length >= this.maxSize) {
      return false
    }

    this._stack.push(obj)
    this._available = Math.min(this.maxSize, this._available + 1)

    if (this._tickPromise) {
      const tickPromise = this._tickPromise
      this._tickPromise = null
      tickPromise.resolve()
    }

    return true
  }

  private _tickPromise: CustomPromise<void> = new CustomPromise()
  tick(abortSignal?: IAbortSignalFast): Promise<void> {
    if (this._available > 0) {
      return
    }
    if (!this._tickPromise) {
      this._tickPromise = new CustomPromise()
    }
    return promiseToAbortable(abortSignal, this._tickPromise.promise)
  }
}
