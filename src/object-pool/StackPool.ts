import {IStackPool} from './contracts'

export class StackPool<TObject> implements IStackPool<TObject> {
  private readonly _stack: TObject[] = []

  get size() {
    return this._stack.length
  }

  get(): TObject {
    const lastIndex = this._stack.length - 1
    if (lastIndex >= 0) {
      const obj = this._stack[lastIndex]
      this._stack.length = lastIndex
      return obj
    }
    return null
  }

  release(obj: TObject) {
    this._stack.push(obj)
  }
}
