import type { IAbortSignalFast } from '@flemist/abort-controller-fast';
import 'setimmediate';
export declare function waitMicrotasks(abortSignalOrPromise?: null | IAbortSignalFast | PromiseLike<any>): Promise<void>;
