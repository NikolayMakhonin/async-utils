import { IPool } from './contracts';
import { IAbortSignalFast } from '@flemist/abort-controller-fast';
export declare class Pools implements IPool {
    private readonly _pools;
    constructor(...pools: IPool[]);
    get maxSize(): number;
    get size(): number;
    get holdAvailable(): number;
    hold(count: number): number;
    get maxReleaseCount(): number;
    release(count: number): number;
    tick(abortSignal?: IAbortSignalFast): Promise<void>;
    holdWait(count: number, abortSignal?: IAbortSignalFast): Promise<void>;
}
