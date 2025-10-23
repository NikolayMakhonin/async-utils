import { type IAbortSignalFast } from '@flemist/abort-controller-fast';
import { type ITimeController } from '@flemist/time-controller';
export declare function delay(milliseconds: number, abortSignal?: IAbortSignalFast, timeController?: ITimeController): Promise<void>;
