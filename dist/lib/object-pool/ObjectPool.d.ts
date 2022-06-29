import { IObjectPool } from './contracts';
import { IAbortSignalFast } from '@flemist/abort-controller-fast';
export declare class ObjectPool<TObject> implements IObjectPool<TObject> {
    readonly maxSize: number;
    private _available;
    private readonly _stack;
    constructor(maxSize: number);
    get size(): number;
    get available(): number;
    get(): TObject;
    release(obj: TObject): boolean;
    private _tickPromise;
    tick(abortSignal?: IAbortSignalFast): Promise<void>;
}
