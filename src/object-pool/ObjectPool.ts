import {IObjectPool, IPool} from './contracts'
import {IAbortSignalFast} from '@flemist/abort-controller-fast'

export class ObjectPool<TObject> implements IObjectPool<TObject> {
  readonly pool: IPool
  private readonly _stack: TObject[] = []

  constructor(pool: IPool) {
    this.pool = pool
  }

  get size() {
    return this._stack.length
  }

  get maxSize() {
    return this.pool.maxSize
  }

  get available() {
    return this.pool.size
  }

  get(): TObject {
    if (this.pool.hold(1)) {
      const lastIndex = this._stack.length - 1
      if (lastIndex >= 0) {
        const obj = this._stack[lastIndex]
        this._stack.length = lastIndex
        return obj
      }
    }
    return null
  }

  release(obj: TObject) {
    if (this.pool.size >= this.pool.maxSize) {
      return false
    }

    this._stack.push(obj)

    this.pool.release(1)

    return true
  }

  tick(abortSignal?: IAbortSignalFast): Promise<void> {
    return this.pool.tick(abortSignal)
  }
}
