import {IObjectPool} from 'src/object-pool/contracts'
import {IAbortSignalFast} from '@flemist/abort-controller-fast'
import {isPromiseLike} from 'src/isPromiseLike'

export async function objectPoolWait<TObject>(
  objectPool: IObjectPool<TObject>,
  abortSignal?: IAbortSignalFast,
): Promise<TObject> {
  while (objectPool.available <= 0) {
    await objectPool.tick()
  }
  return objectPool.get()
}

export async function objectPoolUsing<TObject, TResult>(
  objectPool: IObjectPool<TObject>,
  createObject: () => Promise<TObject>|TObject,
  func: (obj: TObject, abortSignal?: IAbortSignalFast) => Promise<TResult> | TResult,
  abortSignal?: IAbortSignalFast,
): Promise<TResult> {
  let obj = await objectPoolWait(objectPool, abortSignal)
  if (obj == null) {
    obj = await createObject()
  }
  try {
    const result = await func(obj, abortSignal)
    return result
  }
  finally {
    objectPool.release(obj)
  }
}

export function objectPoolAllocate<TObject, TResult extends PromiseLike<TObject>|TObject>(
  objectPool: IObjectPool<TObject>,
  createObject: () => TResult,
  size?: number,
): TResult extends PromiseLike<any> ? Promise<void> : void {
  const promises: Promise<void>[] = []
  let deferSize = 0
  while (
    objectPool.size < objectPool.available
    && (size == null || objectPool.size + deferSize < size)
  ) {
    const nullObject = objectPool.get()
    if (nullObject != null) {
      throw new Error('Unexpected behavior')
    }
    const objectOrPromise = createObject()
    if (isPromiseLike(objectOrPromise)) {
      deferSize++
      promises.push(
        (objectOrPromise as any as Promise<TObject>)
          .then(obj => {
            objectPool.release(obj)
          })
          .catch(err => {
            objectPool.release(null)
            throw err
          }),
      )
    }
    else {
      objectPool.release(objectOrPromise as TObject)
    }
  }
  if (promises.length) {
    return Promise.all(promises) as any
  }
}
