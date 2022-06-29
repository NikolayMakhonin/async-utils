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
}

export interface IStackPool<TObject> {
	size: number
	get(): TObject
	release(obj: TObject): void
}

export interface IObjectPool<TObject> {
	pool: IPool
	stack: IStackPool<TObject>
	size: number
	readonly maxSize: number
	readonly available: number
	get(): TObject
	/** it returns false if the obj cannot be pushed into the object pool (if size >= maxSize) */
	release(obj: TObject): boolean
	/** it will resolve when size > 0 */
	tick(abortSignal?: IAbortSignalFast): Promise<void>
}

export interface IObjectPool2<TObject> {
	pool: IPool
	availableObjects: IStackPool<TObject>
	holdObjects?: Set<TObject>
	create?: () => Promise<TObject>|TObject,
	destroy?: (obj: TObject) => Promise<void>|void,
}
