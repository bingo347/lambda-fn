import {Cell, isCell} from './cell';

type ValueFN<V, R> = (value: V) => R;

export const get = <T>(cell: Cell<T>): T => cell.get();
export const set = <T>(cell: Cell<T>, value: T): void => cell.set(value);
export const update = <T>(cell: Cell<T>, updater: (value: T) => T): void => cell.update(updater);
export const subscribe = <T>(cell: Cell<T>, subscription: (value: T) => void): (() => void) => cell.subscribe(subscription);
export const clone = <T>(cell: Cell<T>): Cell<T> => cell.clone();

export function map<T, U>(cell: Cell<T>, mapper: ValueFN<T, U>): Cell<U>;
export function map<T, U>(mapper: ValueFN<T, U>): (cell: Cell<T>) => Cell<U>;
export function map<T, U>(mapperOrCell: Cell<T> | ValueFN<T, U>, _mapper?: ValueFN<T, U>): Cell<U> | ((cell: Cell<T>) => Cell<U>) {
    const mapper = isCell(mapperOrCell) ? _mapper! : mapperOrCell;
    const resolver = (cell: Cell<T>) => cell.map(mapper);
    return isCell(mapperOrCell) ? resolver(mapperOrCell) : resolver;
}

export function fold<T, U>(cell: Cell<T>, mapper: ValueFN<T, U>): U;
export function fold<T, U>(mapper: ValueFN<T, U>): (cell: Cell<T>) => U;
export function fold<T, U>(mapperOrCell: Cell<T> | ValueFN<T, U>, _mapper?: ValueFN<T, U>): U | ((cell: Cell<T>) => U) {
    const mapper = isCell(mapperOrCell) ? _mapper! : mapperOrCell;
    const resolver = (cell: Cell<T>) => cell.fold(mapper);
    return isCell(mapperOrCell) ? resolver(mapperOrCell) : resolver;
}
