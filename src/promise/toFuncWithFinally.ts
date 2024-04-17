import {isPromiseLike} from 'src/isPromiseLike'
import {promiseFinally} from 'src/promise/promiseFinally'
import {FuncAny} from 'src/contracts'

/** @deprecated */
export function toFuncWithFinally<TFunc extends FuncAny>(
  func: TFunc,
  onFinally: (() => void) | null | undefined,
): TFunc {
  if (!onFinally) {
    return func
  }

  return function funcWithFinally() {
    try {
      const resultOrPromise = func.apply(this, arguments)
      if (!isPromiseLike(resultOrPromise)) {
        onFinally()
        return resultOrPromise
      }
      return promiseFinally(resultOrPromise, onFinally)
    }
    catch (err) {
      onFinally()
      throw err
    }
  } as TFunc
}
