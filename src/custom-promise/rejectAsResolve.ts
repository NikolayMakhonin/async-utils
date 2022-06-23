function promiseRejected(reason?: any): PromiseLike<never> {
  return {
    then(_, reject): any {
      void reject(reason)
    },
  }
}

export function rejectAsResolve(resolve: (value: any) => void, reason?: any) {
  resolve(promiseRejected(reason))
}
