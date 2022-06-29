import {IStackPool, IObjectPool, IPool} from './contracts'
import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {StackPool} from 'src/object-pool/StackPool'

export class ObjectPool<TObject> implements IObjectPool<TObject> {
  readonly pool: IPool
  readonly objects: IStackPool<TObject>

  constructor(pool: IPool) {
    this.pool = pool
    this.objects = new StackPool()
  }

  get size() {
    return this.objects.size
  }

  get maxSize() {
    return this.pool.maxSize
  }

  get available() {
    return this.pool.size
  }

  get(): TObject {
    if (this.pool.hold(1)) {
      return this.objects.get()
    }
    return null
  }

  release(obj: TObject) {
    if (this.pool.maxReleaseCount > 0) {
      this.objects.release(obj)
      this.pool.release(1)
      return true
    }
    return false
  }

  tick(abortSignal?: IAbortSignalFast): Promise<void> {
    return this.pool.tick(abortSignal)
  }
}
