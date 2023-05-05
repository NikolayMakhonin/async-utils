import {FuncAny} from 'src/types'

let queue: FuncAny[] = []
let processPromise: Promise<void>
// let count = 0

async function process() {
  while (queue.length > 0) {
    // console.log(count++)
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await 0
    const _queue = queue
    queue = []
    _queue.forEach((func) => {
      try {
        func()
      }
      catch (err) {
        console.error('Unhandled promise rejection', err)
      }
    })
  }
  processPromise = null
}

export function promiseSchedulerEnqueue(func: FuncAny) {
  queue.push(func)
  if (!processPromise) {
    processPromise = process()
  }
}
