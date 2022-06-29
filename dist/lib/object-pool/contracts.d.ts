import { IAbortSignalFast } from '@flemist/abort-controller-fast';
export interface IObjectPool<TObject> {
    size: number;
    readonly maxSize: number;
    readonly available: number;
    get(): TObject;
    /** it returns false if the obj cannot be pushed into the object pool (if size >= maxSize) */
    release(obj: TObject): boolean;
    /** it will resolve when size > 0 */
    tick(abortSignal?: IAbortSignalFast): Promise<void>;
}
