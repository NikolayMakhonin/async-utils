import {IAbortSignalFast} from '@flemist/abort-controller-fast'

export interface IPool {
	size: number
	readonly maxSize: number
	hold(count: number): number
	/** it returns false if the obj cannot be pushed into the object pool (if size >= maxSize) */
	release(count: number): number
	/** it will resolve when size > 0 */
	tick(abortSignal?: IAbortSignalFast): Promise<void>
}

export interface IObjectPool<TObject> {
	pool: IPool
	size: number
	readonly maxSize: number
	readonly available: number
	get(): TObject
	/** it returns false if the obj cannot be pushed into the object pool (if size >= maxSize) */
	release(obj: TObject): boolean
	/** it will resolve when size > 0 */
	tick(abortSignal?: IAbortSignalFast): Promise<void>
}
