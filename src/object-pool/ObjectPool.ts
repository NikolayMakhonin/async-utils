import {IObjectPool} from './contracts'
import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {promiseToAbortable} from 'src/abort-controller-fast'
import {CustomPromise} from 'src/custom-promise'

export class ObjectPool<TObject> implements IObjectPool<TObject> {
  size = 0
  maxSize
  private readonly _stack = [null]

  constructor(maxSize: number) {
    this.maxSize = maxSize
  }

  get(): TObject {
    const lastIndex = this.size - 1
    if (lastIndex >= 0) {
      const obj = this._stack[lastIndex]
      this._stack[lastIndex] = null
      this.size = lastIndex
      if (obj === null) {
        throw new Error('obj === null')
      }
      return obj
    }

    return null
  }

  release(obj: TObject) {
    if (this.size < this.maxSize) {
      this._stack[this.size] = obj
      this.size++
      if (this._tickPromise) {
        const tickPromise = this._tickPromise
        this._tickPromise = null
        tickPromise.resolve()
      }
    }
  }

  available(): boolean {
    return this.size > 0
  }

  private _tickPromise: CustomPromise<void> = new CustomPromise()
  tick(abortSignal?: IAbortSignalFast): Promise<void> {
    if (this.available()) {
      return
    }
    if (!this._tickPromise) {
      this._tickPromise = new CustomPromise()
    }
    return promiseToAbortable(abortSignal, this._tickPromise.promise)
  }
}
