import { FuncAny } from "../contracts";
/** @deprecated */
export declare function toFuncWithFinally<TFunc extends FuncAny>(func: TFunc, onFinally: (() => void) | null | undefined): TFunc;
