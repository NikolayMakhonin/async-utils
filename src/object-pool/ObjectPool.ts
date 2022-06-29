import {ICachePool, IObjectPool, IPool} from './contracts'
import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {CachePool} from 'src/object-pool/CachePool'

export class ObjectPool<TObject> implements IObjectPool<TObject> {
  readonly pool: IPool
  private readonly _cachePool: ICachePool<TObject>

  constructor(pool: IPool) {
    this.pool = pool
    this._cachePool = new CachePool()
  }

  get size() {
    return this._cachePool.size
  }

  get maxSize() {
    return this.pool.maxSize
  }

  get available() {
    return this.pool.size
  }

  get(): TObject {
    if (this.pool.hold(1)) {
      return this._cachePool.get()
    }
    return null
  }

  release(obj: TObject) {
    if (this.pool.size >= this.pool.maxSize) {
      return false
    }

    this._cachePool.release(obj)

    this.pool.release(1)

    return true
  }

  tick(abortSignal?: IAbortSignalFast): Promise<void> {
    return this.pool.tick(abortSignal)
  }
}
