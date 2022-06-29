import { IObjectPool } from "./contracts";
import { IAbortSignalFast } from '@flemist/abort-controller-fast';
export declare function objectPoolWait<TObject>(objectPool: IObjectPool<TObject>, abortSignal?: IAbortSignalFast): Promise<TObject>;
export declare function objectPoolUsing<TObject, TResult>(objectPool: IObjectPool<TObject>, createObject: () => Promise<TObject> | TObject, func: (obj: TObject, abortSignal?: IAbortSignalFast) => Promise<TResult> | TResult, abortSignal?: IAbortSignalFast): Promise<TResult>;
export declare function objectPoolAllocate<TObject, TResult extends PromiseLike<TObject> | TObject>(objectPool: IObjectPool<TObject>, createObject: () => TResult, size?: number): TResult extends PromiseLike<any> ? Promise<void> : void;
