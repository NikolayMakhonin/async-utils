export function promiseFinally<TPromise extends PromiseLike<any>>(
  promise: TPromise,
  onFinally: () => void,
): TPromise {
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
