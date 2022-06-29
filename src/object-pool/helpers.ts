import {IObjectPool} from 'src/object-pool/contracts'
import {IAbortSignalFast} from '@flemist/abort-controller-fast'

export async function objectPoolWait<TObject>(
  objectPool: IObjectPool<TObject>,
  abortSignal?: IAbortSignalFast,
): Promise<TObject> {
  while (objectPool.size <= 0) {
    await objectPool.tick()
  }
  return objectPool.get()
}

export async function objectPoolUsing<TObject, TResult>(
  objectPool: IObjectPool<TObject>,
  func: (obj: TObject, abortSignal?: IAbortSignalFast) => Promise<TResult> | TResult,
  abortSignal?: IAbortSignalFast,
): Promise<TResult> {
  const obj = await objectPoolWait(objectPool, abortSignal)
  try {
    const result = await func(obj, abortSignal)
    return result
  }
  finally {
    objectPool.release(obj)
  }
}
