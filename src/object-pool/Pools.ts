import {IPool} from './contracts'
import {IAbortSignalFast} from '@flemist/abort-controller-fast'

export class Pools implements IPool {
  private readonly _pools: IPool[]

  constructor(...pools: IPool[]) {
    if (!pools?.length) {
      throw new Error('pools should not be empty')
    }
    this._pools = pools
  }

  get maxSize() {
    const pools = this._pools
    let min: number
    for (let i = 0, len = pools.length; i < len; i++) {
      const value = pools[i].maxSize
      if (i === 0 || value < min) {
        min = value
      }
    }
    return min
  }

  get size() {
    const pools = this._pools
    let min: number
    for (let i = 0, len = pools.length; i < len; i++) {
      const value = pools[i].size
      if (i === 0 || value < min) {
        min = value
      }
    }
    return min
  }

  get holdAvailable() {
    return this.size
  }

  hold(count: number): number {
    const size = this.size
    if (count > size) {
      count = size
    }
    if (count > 0) {
      const pools = this._pools
      for (let i = 0, len = pools.length; i < len; i++) {
        pools[i].hold(count)
      }
    }
    return count
  }

  get maxReleaseCount() {
    return this.maxSize - this.size
  }

  release(count: number): number {
    const size = this.size
    const maxReleaseCount = this.maxSize - size
    if (count > maxReleaseCount) {
      count = maxReleaseCount
    }
    if (count > 0) {
      const pools = this._pools
      for (let i = 0, len = pools.length; i < len; i++) {
        pools[i].release(count)
      }
    }
    return count
  }

  tick(abortSignal?: IAbortSignalFast): Promise<void> {
    return Promise.race(this._pools.map(o => o.tick(abortSignal)))
  }

  async holdWait(count: number, abortSignal?: IAbortSignalFast) {
    if (count > this.maxSize) {
      throw new Error(`holdCount (${count} > maxSize (${this.maxSize}))`)
    }
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
