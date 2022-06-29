export function isPromiseLike<TValue>(
  obj: TValue,
): TValue extends PromiseLike<any> ? true : false {
  if (
    obj != null
    && typeof obj === 'object'
    && typeof (obj as any).then === 'function'
  ) {
    return true as any
  }
  return false as any
}
