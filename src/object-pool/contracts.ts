import {IAbortSignalFast} from '@flemist/abort-controller-fast'

export interface IPool {
	size: number
	readonly maxSize: number

	hold(count: number): number
	/** it returns false if the obj cannot be pushed into the object pool (if size >= maxSize) */

	maxReleaseCount: number
	release(count: number): number

	/** it will resolve when size > 0 */
	tick(abortSignal?: IAbortSignalFast): Promise<void>

	/** wait size > 0 and hold, use this for concurrency hold */
	holdWait(count: number, abortSignal?: IAbortSignalFast): Promise<void>
}

export interface IStackPool<TObject> {
	readonly objects: ReadonlyArray<TObject>
	readonly size: number
	get(): TObject
	release(obj: TObject): void
}

export interface IObjectPool<TObject> {
	readonly available: number
	readonly maxSize: number

	readonly availableObjects: ReadonlyArray<TObject>
	readonly holdObjects?: ReadonlySet<TObject>

	get(): TObject
	/** it returns false if the obj cannot be pushed into the object pool (if size >= maxSize) */
	release(obj: TObject): boolean

	/** it will resolve when size > 0 */
	tick(abortSignal?: IAbortSignalFast): Promise<void>
	/** wait available > 0 and get, use this for concurrency get */
	getWait(abortSignal?: IAbortSignalFast): Promise<TObject>
}
