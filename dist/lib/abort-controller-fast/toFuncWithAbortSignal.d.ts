import { type IAbortSignalFast } from '@flemist/abort-controller-fast';
import { FuncAny } from "../contracts";
/** @deprecated */
export declare function toFuncWithAbortSignal<TFunc extends FuncAny>(abortSignal: IAbortSignalFast | null | undefined, onAbort: (() => void) | null | undefined, func: TFunc): TFunc;
