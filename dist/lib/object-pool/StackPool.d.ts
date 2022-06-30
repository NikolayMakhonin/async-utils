import { IStackPool } from './contracts';
export declare class StackPool<TObject> implements IStackPool<TObject> {
    private readonly _objects;
    get objects(): ReadonlyArray<TObject>;
    get size(): number;
    get(): TObject;
    release(obj: TObject): void;
}
