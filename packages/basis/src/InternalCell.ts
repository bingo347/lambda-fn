const InternalCellValues = new WeakMap<InternalCell<unknown>, unknown>();

/** @ignore */
export class InternalCell<T> {
    constructor(value: T) {
        InternalCellValues.set(this, value);
    }

    public get unsafeValue(): T {
        return InternalCellValues.get(this) as T;
    }
}
