import {AbortControllerFast, IAbortSignalFast} from '@flemist/abort-controller-fast'

export async function useAbortController<T>(func: (abortSignal: IAbortSignalFast) => Promise<T> | T): Promise<T> {
  const abortController = new AbortControllerFast()
  try {
    return await func(abortController.signal)
  }
  finally {
    abortController.abort()
  }
}
