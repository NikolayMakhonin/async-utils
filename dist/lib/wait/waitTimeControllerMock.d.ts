import { type TimeControllerMock } from '@flemist/time-controller';
import type { IAbortSignalFast } from '@flemist/abort-controller-fast';
export declare type WaitTimeControllerMockOptions = {
    timeout?: null | number;
    /**
     * - `number` - N `await Promise.resolve().then()` per iteration
     * - `null` - wait 1 macrotask per iteration
     */
    awaitsPerIteration?: null | number;
};
export declare function waitTimeControllerMock<T = any>(timeControllerMock: TimeControllerMock, abortSignalOrPromise: PromiseLike<T>, options?: null | WaitTimeControllerMockOptions): Promise<T>;
export declare function waitTimeControllerMock(timeControllerMock: TimeControllerMock, abortSignal?: null | IAbortSignalFast, options?: null | WaitTimeControllerMockOptions): Promise<void>;
