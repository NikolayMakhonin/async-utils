import {IAbortSignalFast} from '@flemist/abort-controller-fast'

export interface IObjectPool<TObject> {
	get(): TObject
	release(obj: TObject): void
	available(): boolean
	tick(abortSignal?: IAbortSignalFast): Promise<void>
}
