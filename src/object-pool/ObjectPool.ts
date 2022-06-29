import {IObjectPool} from './contracts'
import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {promiseToAbortable} from 'src/abort-controller-fast'
import {CustomPromise} from 'src/custom-promise'

export class ObjectPool<TObject> implements IObjectPool<TObject> {
  size: number = 0
  readonly maxSize: number
  private readonly _stack = [null]

  constructor(maxSize: number) {
    this.maxSize = maxSize
    this.size = maxSize
  }

  get(): TObject {
    const lastIndex = this.size - 1
    if (lastIndex >= 0) {
      const obj = this._stack[lastIndex]
      this._stack[lastIndex] = null
      this.size = lastIndex
      return obj
    }

    return null
  }

  release(obj: TObject) {
    if (this.size >= this.maxSize) {
      return false
    }

    this._stack[this.size] = obj
    this.size++

    if (this._tickPromise) {
      const tickPromise = this._tickPromise
      this._tickPromise = null
      tickPromise.resolve()
    }

    return true
  }

  private _tickPromise: CustomPromise<void> = new CustomPromise()
  tick(abortSignal?: IAbortSignalFast): Promise<void> {
    if (this.size > 0) {
      return
    }
    if (!this._tickPromise) {
      this._tickPromise = new CustomPromise()
    }
    return promiseToAbortable(abortSignal, this._tickPromise.promise)
  }
}
