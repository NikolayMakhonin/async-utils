import { type IAbortSignalFast } from '@flemist/abort-controller-fast';
export declare type CustomPromiseStatus = 'pending' | 'resolved' | 'rejected';
export declare class CustomPromise<TResult = void> {
    readonly promise: Promise<TResult>;
    readonly resolve: (result: TResult) => void;
    readonly reject: (error?: any) => void;
    private _status;
    get state(): CustomPromiseStatus;
    constructor(abortSignal?: IAbortSignalFast);
}
