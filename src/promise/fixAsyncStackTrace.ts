export async function fixAsyncStackTrace<T>(func: () => Promise<T> | T): Promise<T> {
  const error = new Error()
  try {
    return await func()
  }
  catch (err) {
    if (err instanceof Error) {
      err.stack = (err.stack ? err.stack + '\n' : '')
        + error.stack?.substring(error.stack.indexOf('\n'))
    }
    throw err
  }
}
