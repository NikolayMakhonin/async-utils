import {isPromiseLike} from 'src/isPromiseLike'
import {promiseFinally} from 'src/promise/promiseFinally'
import {FuncAny} from 'src/contracts'

export function toFuncWithFinally<TFunc extends FuncAny>(
  func: TFunc,
  onFinally: () => void,
): TFunc {
  return function funcWithFinally() {
    try {
      const resultOrPromise = func.apply(this, arguments)
      if (!isPromiseLike(resultOrPromise)) {
        return resultOrPromise
      }
      return promiseFinally(resultOrPromise, onFinally)
    }
    finally {
      onFinally()
    }
  } as TFunc
}
