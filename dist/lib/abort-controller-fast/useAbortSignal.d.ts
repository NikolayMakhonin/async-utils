import { IAbortSignalFast } from '@flemist/abort-controller-fast';
import { FuncAny } from "../contracts";
export declare function useAbortSignal<TFunc extends FuncAny>(abortSignal: IAbortSignalFast, onAbort: () => void, func: TFunc): TFunc;
