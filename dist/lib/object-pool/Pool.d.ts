import { IPool } from './contracts';
import { IAbortSignalFast } from '@flemist/abort-controller-fast';
export declare class Pool implements IPool {
    readonly maxSize: number;
    private _size;
    constructor(maxSize: number);
    get size(): number;
    get holdAvailable(): number;
    hold(count: number): number;
    get maxReleaseCount(): number;
    release(count: number): number;
    private _tickPromise;
    tick(abortSignal?: IAbortSignalFast): Promise<void>;
    holdWait(count: number, abortSignal?: IAbortSignalFast): Promise<void>;
}
