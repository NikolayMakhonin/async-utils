import { waitMicrotasks } from './waitMicrotasks'
import { calcPerformanceAsync } from 'rdtsc/node'
import {EMPTY_FUNC} from 'src/constants'

describe('waitMicrotasks', () => {
  it('stress', async () => {
    let resolvedActual = 0
    function createMicrotasksTree(levels: number, countPerLevel: number) {
      if (levels === 0) {
        resolvedActual++
        return 1
      }
      for (let i = 0; i < countPerLevel; i++) {
        Promise.resolve().then(() =>
          createMicrotasksTree(levels - 1, countPerLevel),
        )
      }
      return countPerLevel ** levels
    }
    for (let i = 0; i < 5; i++) {
      resolvedActual = 0
      const resolvedExpected = createMicrotasksTree(i, i)
      await waitMicrotasks()
      console.log('i', i)
      assert.strictEqual(resolvedActual, resolvedExpected)
    }
  })

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
