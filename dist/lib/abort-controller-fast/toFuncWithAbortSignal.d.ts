import { IAbortSignalFast } from '@flemist/abort-controller-fast';
import { FuncAny } from "../contracts";
/** @deprecated */
export declare function toFuncWithAbortSignal<TFunc extends FuncAny>(abortSignal: IAbortSignalFast | null, onAbort: (() => void) | null, func: TFunc): TFunc;
