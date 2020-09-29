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

// eslint-disable-next-line max-lines-per-function
export const Cell: CellFactory = Object.defineProperties(<T>(initialValue: T): Cell<T> => {
    let currentValue = initialValue;
    const subscriptions = new Set<ValueFN<T, void>>();
    const get = () => currentValue;
    const set = (value: T) => {
        if(value === currentValue) { return; }
        currentValue = value;
        for(const subscription of subscriptions.values()) {
            subscription(currentValue);
        }
    };
    return mergeCellWithPatchers(Object.defineProperties({}, {
        value: {get, set, enumerable: true},
        get: makeDescriptor(get),
        set: makeDescriptor(set),
        subscribe: makeDescriptor((subscription: ValueFN<T, void>) => (
            subscriptions.add(subscription),
            subscription(currentValue),
            () => void subscriptions.delete(subscription)
        ))
    }));
}, {
    isCell: makeDescriptor(isCell),
    isCellWith: makeDescriptor(isCellWith)
});

export const patch = (cb: ExtendFN, configurable = true): void => void patchers.push([cb, configurable]);

const mergeCellWithPatchers = <T>(cell: Partial<Cell<T>>): Cell<T> => patchers.reduce((partialCell, [cb, configurable]) => (
    mergeCell(partialCell, cb(partialCell.get!, partialCell.set!, partialCell.subscribe!), configurable)
), cell) as any as Cell<T>;

const mergeCell = <T>(currentCell: Partial<Cell<T>>, extendedCell: Partial<Cell<T>>, configurable: boolean) => {
    for(const key of Object.getOwnPropertyNames(extendedCell) as (keyof Cell<T>)[]) {
        Object.defineProperty(currentCell, key, makeDescriptor(extendedCell[key], configurable));
    }
    for(const key of Object.getOwnPropertySymbols(extendedCell) as (keyof Cell<T>)[]) {
        Object.defineProperty(currentCell, key, makeDescriptor(extendedCell[key], configurable));
    }
    return currentCell;
};

patch((get, set) => ({
    update: updater => set(updater(get())),
    clone: () => Cell(get()),
    map: mapper => Cell(mapper(get())),
    fold: mapper => mapper(get()),
    [GUARD]: CellKind.Cell
}), false);
