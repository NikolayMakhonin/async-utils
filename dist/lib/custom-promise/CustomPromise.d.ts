import { IAbortSignalFast } from '@flemist/abort-controller-fast';
export declare class CustomPromise<TResult> {
    readonly promise: Promise<TResult>;
    readonly resolve: (result?: TResult) => void;
    readonly reject: (error?: any) => void;
    constructor(abortSignal?: IAbortSignalFast);
}
