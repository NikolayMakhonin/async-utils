import { calcPerformanceAsync } from 'rdtsc'
import {EMPTY_FUNC} from 'src/constants'

describe('waitMicrotasks perf', () => {
  it(
    'setImmediate',
    async function () {
      this.timeout(
        60 * 60 * 1000)
      const result = await calcPerformanceAsync({
        time : 1000,
        funcs: [
          async () => {
            for (let i = 0; i < 16; i++) {
              await Promise.resolve().then(EMPTY_FUNC)
            }
          },
          // () => {
          //   return waitMicrotasks()
          // },
          () => {
            return new Promise<void>(resolve => {
              setImmediate(resolve)
            })
          },
        ],
      })
      console.log(result)
    },
  )
})
