import {TypeGuard, isObject} from '@lambda-fn/type-guards';

type ValueFN<V, R> = (value: V) => R;
type ExtendFN = <T>(
    get: Cell<T>['get'],
    set: Cell<T>['set'],
    subscribe: Cell<T>['subscribe']
) => Partial<Cell<T>>;

const enum CellKind { Cell }
const GUARD = Symbol();
const patchers: [ExtendFN, boolean][] = [];
const makeDescriptor = (value: any, configurable = false, enumerable = false, writable = false): PropertyDescriptor => ({
    value,
    configurable,
    enumerable,
    writable
});

export interface CellStatic {
    isCell(maybeCell: unknown): maybeCell is Cell<unknown>;
    isCellWith<T>(guard: TypeGuard<T>, maybeCell: unknown): maybeCell is Cell<T>;
}

export interface CellFactory extends CellStatic {
    <T>(initialValue: T): Cell<T>;
}

export interface Cell<T> {
    readonly [GUARD]: CellKind.Cell;
    value: T;
    get(): T;
    set(value: T): void;
    update(updater: ValueFN<T, T>): void;
    subscribe(subscription: ValueFN<T, void>): () => void;
    clone(): Cell<T>;
    map<U>(mapper: ValueFN<T, U>): Cell<U>;
    fold<U>(mapper: ValueFN<T, U>): U;
}

export const isCell = (maybeCell: unknown): maybeCell is Cell<unknown> => isObject(maybeCell) && maybeCell[GUARD as any] === CellKind.Cell;
export const isCellWith = <T>(guard: TypeGuard<T>, maybeCell: unknown): maybeCell is Cell<T> => isCell(maybeCell) && maybeCell.fold(guard);

export const Cell: CellFactory = Object.defineProperties(<T>(initialValue: T): Cell<T> => {
    let currentValue = initialValue;
    return mergeCellWithPatchers(Object.defineProperties({}, {
        get: makeDescriptor(() => currentValue),
        set: makeDescriptor((value: T) => {
            currentValue = value;
        }, true)
    }));
}, {
    isCell: makeDescriptor(isCell),
    isCellWith: makeDescriptor(isCellWith)
});

export const patch = (cb: ExtendFN, configurable = true): void => void patchers.push([cb, configurable]);

const mergeCellWithPatchers = <T>(cell: Partial<Cell<T>>): Cell<T> => patchCellWithValue(patchers.reduce((partialCell, [cb, configurable]) => (
    mergeCell(partialCell, cb(partialCell.get!, partialCell.set!, partialCell.subscribe!), configurable)
), cell) as any);

const mergeCell = <T>(currentCell: Partial<Cell<T>>, extendedCell: Partial<Cell<T>>, configurable: boolean) => {
    for(const key of Object.getOwnPropertyNames(extendedCell) as (keyof Cell<T>)[]) {
        Object.defineProperty(currentCell, key, makeDescriptor(extendedCell[key], configurable));
    }
    for(const key of Object.getOwnPropertySymbols(extendedCell) as (keyof Cell<T>)[]) {
        Object.defineProperty(currentCell, key, makeDescriptor(extendedCell[key], configurable));
    }
    return currentCell;
};

const patchCellWithValue = <T>(cell: Cell<T>): Cell<T> => Object.defineProperty(cell, 'value', {
    get: cell.get, // eslint-disable-line @typescript-eslint/unbound-method
    set: cell.set, // eslint-disable-line @typescript-eslint/unbound-method
    enumerable: true
});

patch(() => ({[GUARD]: CellKind.Cell}), false);
patch((get, set) => {
    const subscriptions = new Set<ValueFN<ReturnType<typeof get>, void>>();
    const wrappedSet: typeof set = value => {
        if(value === get()) { return; }
        set(value);
        for(const subscription of subscriptions.values()) {
            subscription(value);
        }
    };
    return {
        set: wrappedSet,
        subscribe: subscription => (
            subscriptions.add(subscription),
            subscription(get()),
            () => void subscriptions.delete(subscription)
        )
    };
}, false);
patch((get, set) => ({
    update: updater => set(updater(get())),
    clone: () => Cell(get()),
    map: mapper => Cell(mapper(get())),
    fold: mapper => mapper(get())
}), false);
