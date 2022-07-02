import { IStackPool, IObjectPool, IPool } from './contracts';
import { IAbortSignalFast } from '@flemist/abort-controller-fast';
export declare type ObjectPoolArgs<TObject extends object> = {
    maxSize?: number;
    pool?: IPool;
    availableObjects?: IStackPool<TObject>;
    holdObjects?: boolean | Set<TObject>;
    create?: () => Promise<TObject> | TObject;
    destroy?: (obj: TObject) => Promise<void> | void;
};
export declare class ObjectPool<TObject extends object> implements IObjectPool<TObject> {
    private readonly _pool;
    private readonly _availableObjects;
    private readonly _holdObjects;
    private readonly _create?;
    private readonly _destroy?;
    constructor({ maxSize, pool, availableObjects, holdObjects, destroy, create, }: ObjectPoolArgs<TObject>);
    get available(): number;
    get maxSize(): number;
    get availableObjects(): ReadonlyArray<TObject>;
    get holdObjects(): ReadonlySet<TObject>;
    get(): TObject;
    release(obj: TObject): boolean;
    tick(abortSignal?: IAbortSignalFast): Promise<void>;
    getWait(abortSignal?: IAbortSignalFast): Promise<TObject>;
    use<TResult>(func: (obj: TObject, abortSignal?: IAbortSignalFast) => Promise<TResult> | TResult, abortSignal?: IAbortSignalFast): Promise<TResult>;
    allocate<TResult extends PromiseLike<TObject> | TObject>(size?: number): TResult extends PromiseLike<any> ? Promise<void> : void;
}
