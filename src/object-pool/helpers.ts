import {IObjectPool} from 'src/object-pool/contracts'
import {IAbortSignalFast} from '@flemist/abort-controller-fast'

export async function objectPoolWait<TObject>(
  objectPool: IObjectPool<TObject>,
  abortSignal?: IAbortSignalFast,
): Promise<TObject> {
  while (!this.available()) {
    await this.tick()
  }
  return this.get()
}

export async function objectPoolUsing<TObject, TResult>(
  objectPool: IObjectPool<TObject>,
  func: (obj: TObject, abortSignal?: IAbortSignalFast) => Promise<TResult> | TResult,
  abortSignal?: IAbortSignalFast,
): Promise<TResult> {
  const obj = await this.wait(abortSignal)
  try {
    const result = await func(obj, abortSignal)
    return result
  }
  finally {
    this.release(obj)
  }
}
