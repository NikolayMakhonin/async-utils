export async function fixAsyncStackTrace<T>(func: () => Promise<T> | T): Promise<T> {
  const error = new Error()
  try {
    return await func()
  }
  catch (err) {
    err.stack += '\n' + error.stack.substring(error.stack.indexOf('\n'))
    throw err
  }
}
