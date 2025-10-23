import { type IAbortSignalFast } from '@flemist/abort-controller-fast';
import { type ITimeController } from '@flemist/time-controller';
import { PromiseOrValue } from "../types";
export declare type ThrottledFuncArgs<Args> = [
    args?: null | Args,
    options?: null | {
        throttleTime?: null | number | false;
        throttleTimeMax?: null | number | false;
    }
] | [false];
export declare type ThrottledFunc<Args = never, Result = any> = (...args: ThrottledFuncArgs<Args>) => Promise<Result | null>;
export declare type ToThrottledArgs<Args, Result> = {
    throttleTimeDefault?: null | number;
    throttleTimeMax?: null | number;
    func: (args?: null | Args, options?: null | {
        abortSignal?: null | IAbortSignalFast;
    }) => PromiseOrValue<Result>;
    skipFirst?: boolean;
    abortSignal?: null | IAbortSignalFast;
    timeController?: null | ITimeController;
};
export declare function toThrottled<Args = never, Result = any>({ throttleTimeDefault, throttleTimeMax, func, skipFirst, abortSignal, timeController, }: ToThrottledArgs<Args, Result>): ThrottledFunc<Args, Result>;
