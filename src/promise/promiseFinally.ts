export function promiseFinally<TPromise extends PromiseLike<any>>(
  promise: TPromise,
  onFinally: (() => void) | null,
): TPromise {
  if (!onFinally) {
    return promise
  }

  return promise.then(
    (result) => {
      onFinally()
      return result
    },
    (err) => {
      onFinally()
      throw err
    },
  ) as TPromise
}
