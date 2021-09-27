import {internal} from './internal';

const InternalCellValues = new WeakMap<InternalCell<unknown>, unknown>();

/** @ignore */
export abstract class InternalCell<T> {
    constructor(value: T) {
        InternalCellValues.set(this, value);
    }

    protected get [internal.InternalCellUnsafeValue](): T {
        return InternalCellValues.get(this) as T;
    }

    protected abstract [internal.InternalCellContextualFactory]<V>(value: V): InternalCell<V>;
}
