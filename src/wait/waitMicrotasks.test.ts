// import { getMicrotasksCount } from '$shared/lib/db-new/-test/getMicrotasksCount'
import { waitMicrotasks } from './waitMicrotasks'
import { calcPerformanceAsync } from 'rdtsc/node'

describe('waitMicrotasks', () => {
  // it('base', async () => {
  //   await waitMicrotasks()
  //
  //   let microtasksCount = getMicrotasksCount()
  //   await waitMicrotasks()
  //   let deltaCountActual = getMicrotasksCount() - microtasksCount
  //
  //   expect(deltaCountActual).toBe(2)
  //
  //   microtasksCount = getMicrotasksCount()
  //   await Promise.all(Array.from({ length: 10 }, () => waitMicrotasks()))
  //   deltaCountActual = getMicrotasksCount() - microtasksCount
  //
  //   expect(deltaCountActual).toBe(35)
  // })

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

  // it('create promise', async () => {
  //   function test(promiseFactory: () => Promise<any>) {
  //     const microtasksCount = getMicrotasksCount()
  //     const promise: any = promiseFactory()
  //     if (promise.id) {
  //       return
  //     }
  //     if (getMicrotasksCount() > microtasksCount) {
  //       return
  //     }
  //     throw new Error('Promise creation is not intercepted')
  //   }
  //
  //   // Via constructor
  //   test(() => new Promise(() => {}))
  //
  //   // Via Promise.resolve
  //   test(() => Promise.resolve())
  //
  //   // Via Promise.reject
  //   test(() => Promise.reject())
  //
  //   // Via Promise.all
  //   test(() => Promise.all([]))
  //
  //   // Via Promise.race
  //   test(() => Promise.race([]))
  //
  //   // Via Promise.allSettled
  //   test(() => Promise.allSettled([]))
  //
  //   // Via Promise.any
  //   test(() => Promise.any([]))
  //
  //   // Via Promise.resolve().then
  //   const promise = Promise.resolve()
  //   test(() => promise.then(() => {}))
  //
  //   // Via Promise.resolve().catch
  //   test(() => promise.catch(() => {}))
  //
  //   // Via Promise.resolve().finally
  //   test(() => promise.finally(() => {}))
  //
  //   // Via async function call
  //   test(() => (async () => {})().then(() => {}))
  //
  //   // Via async function call
  //   test(() =>
  //     (async () => {
  //       await promise
  //     })().then(() => {}),
  //   )
  //
  //   // Via async function call
  //   test(() =>
  //     (async () => {
  //       return promise
  //     })().then(() => {}),
  //   )
  // })

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
              await Promise.resolve().then(() => {})
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
