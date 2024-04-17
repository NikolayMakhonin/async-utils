import { PromiseLikeOrValue } from "../promise-fast/PromiseFast";
/** Optimized try finally with sync and async support:
const context = await init()
try {
  return await func(context)
} finally {
  await onFinally()
}
*/
export declare function runWithFinally<Context, Result>(
/** init executes outside of try-catch block without onFinally and returns context that will be passed to func */
init: (() => Context) | null | undefined, 
/** func executes in try-catch block and onFinally executes in finally block */
func: (context: Context) => Result, onFinally: (() => void) | null | undefined): Result;
export declare function runWithFinally<Context, Result>(
/** init executes outside of try-catch block without onFinally and returns context that will be passed to func */
init: (() => PromiseLikeOrValue<Context>) | null | undefined, 
/** func executes in try-catch block and onFinally executes in finally block */
func: (context: Context) => PromiseLikeOrValue<Result>, onFinally: (() => PromiseLikeOrValue<void>) | null | undefined): PromiseLikeOrValue<Result>;
