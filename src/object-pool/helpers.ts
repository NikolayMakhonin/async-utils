// import {IObjectPool2, IPool, IStackPool} from 'src/object-pool/contracts'
// import {IAbortSignalFast} from '@flemist/abort-controller-fast'
// import {isPromiseLike} from 'src/isPromiseLike'
// import {Pool} from 'src/object-pool/Pool'
// import {StackPool} from '~/src'
//
// export function createObjectPool<TObject>(params: ({
//   maxSize: number,
//   pool?: never
// } | {
//   maxSize?: never,
//   pool: IPool
// }) & {
//   availableObjects?: IStackPool<TObject>
//   holdObjects?: boolean | Set<TObject>,
//   create?: () => Promise<TObject>|TObject,
//   destroy?: (obj: TObject) => Promise<void>|void,
// }): IObjectPool2<TObject> {
//   return {
//     pool            : params.pool || new Pool(params.maxSize),
//     availableObjects: params.availableObjects || new StackPool(),
//     holdObjects     : params.holdObjects === true ? new Set<TObject>() : params.holdObjects || void 0,
//     create          : params.create,
//     destroy         : params.destroy,
//   }
// }
//
// export async function poolWait(
//   pool: IPool,
//   abortSignal?: IAbortSignalFast,
// ): Promise<void> {
//   while (!pool.hold(1)) {
//     await pool.tick()
//   }
// }
//
// export function objectPoolRelease<TObject>(
//   objectPool: {
//     pool: IPool,
//     availableObjects: IStackPool<TObject>,
//     holdObjects?: Set<TObject>,
//   },
//   obj: TObject,
// ): boolean {
//   if (objectPool.holdObjects) {
//     objectPool.holdObjects.delete(obj)
//   }
//   if (objectPool.pool.maxReleaseCount > 0) {
//     objectPool.availableObjects.release(obj)
//     objectPool.pool.release(1)
//     return true
//   }
//   return false
// }
//
// export async function objectPoolUsing<TObject, TResult>(
//   objectPool: IObjectPool2<TObject>,
//   func: (obj: TObject, abortSignal?: IAbortSignalFast) => Promise<TResult> | TResult,
//   abortSignal?: IAbortSignalFast,
// ): Promise<TResult> {
//   await poolWait(objectPool.pool, abortSignal)
//   let obj = objectPool.availableObjects.get()
//   if (obj == null && objectPool.create) {
//     obj = await objectPool.create()
//   }
//   try {
//     const result = await func(obj, abortSignal)
//     return result
//   }
//   finally {
//     if (!objectPoolRelease(objectPool, obj) && objectPool.destroy) {
//       await objectPool.destroy(obj)
//     }
//   }
// }
//
// export function objectPoolAllocate<TObject, TResult extends PromiseLike<TObject>|TObject>(
//   objectPool: Omit<IObjectPool2<TObject>, 'destroy'>,
//   size?: number,
// ): TResult extends PromiseLike<any> ? Promise<void> : void {
//   if (!objectPool.create) {
//     return
//   }
//   const promises: Promise<void>[] = []
//   let tryHoldCount = objectPool.pool.size - objectPool.availableObjects.size
//   if (size != null && size < tryHoldCount) {
//     tryHoldCount = size
//   }
//   if (tryHoldCount < 0) {
//     throw new Error('Unexpected behavior')
//   }
//   const holdCount = objectPool.pool.hold(tryHoldCount)
//   for (let i = 0; i < holdCount; i++) {
//     const objectOrPromise = objectPool.create()
//     if (isPromiseLike(objectOrPromise)) {
//       promises.push(
//         (objectOrPromise as any as Promise<TObject>)
//           .then(obj => {
//             objectPoolRelease(objectPool, obj)
//           })
//           .catch(err => {
//             objectPoolRelease(objectPool, null)
//             throw err
//           }),
//       )
//     }
//     else {
//       objectPoolRelease(objectPool, objectOrPromise as TObject)
//     }
//   }
//   if (promises.length) {
//     return Promise.all(promises) as any
//   }
// }
