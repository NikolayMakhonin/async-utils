export { ObjectPool } from './ObjectPool.mjs';
export { objectPoolAllocate, objectPoolUsing, objectPoolWait } from './helpers.mjs';
import '@flemist/abort-controller-fast';
import 'tslib';
import '../custom-promise/CustomPromise.mjs';
import '../promise-fast/PromiseFast.mjs';
import '../isPromiseLike.mjs';
import '../custom-promise/rejectAsResolve.mjs';
import '../abort-controller-fast/promiseToAbortable.mjs';
