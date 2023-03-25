import { FuncAny } from "../contracts";
export declare function toFuncWithFinally<TFunc extends FuncAny>(func: TFunc, onFinally: (() => void) | null): TFunc;
