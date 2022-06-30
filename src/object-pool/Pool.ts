import {IPool} from './contracts'
import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {promiseToAbortable} from 'src/abort-controller-fast'
import {CustomPromise} from 'src/custom-promise'

export class Pool implements IPool {
  readonly maxSize: number = 0
  private _size: number = 0

  constructor(maxSize: number) {
    if (!maxSize) {
      throw new Error('maxSize should be > 0')
    }
    this.maxSize = maxSize
    this._size = maxSize
  }

  get size() {
    return this._size
  }

  get holdAvailable() {
    return this._size
  }

  hold(count: number): number {
    const size = this._size
    if (count > size) {
      count = size
    }
    if (count > 0) {
      this._size = size - count
    }
    return count
  }

  get maxReleaseCount() {
    return this.maxSize - this._size
  }

  release(count: number): number {
    const size = this._size
    const maxReleaseCount = this.maxSize - size
    if (count > maxReleaseCount) {
      count = maxReleaseCount
    }
    if (count > 0) {
      this._size = size + count

      if (this._tickPromise) {
        const tickPromise = this._tickPromise
        this._tickPromise = null
        tickPromise.resolve()
      }
    }

    return count
  }

  private _tickPromise: CustomPromise<void> = new CustomPromise()
  tick(abortSignal?: IAbortSignalFast): Promise<void> {
    if (this._size > 0) {
      return
    }
    if (!this._tickPromise) {
      this._tickPromise = new CustomPromise()
    }
    return promiseToAbortable(abortSignal, this._tickPromise.promise)
  }

  async holdWait(count: number, abortSignal?: IAbortSignalFast) {
    let holdCount: number = 0
    try {
      while (true) {
        holdCount += this.hold(count - holdCount)
        if (holdCount === count) {
          return
        }
        await this.tick(abortSignal)
      }
    }
    catch (err) {
      this.release(holdCount)
      throw err
    }
  }
}
