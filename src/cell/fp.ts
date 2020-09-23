import {Cell, isCell} from './cell';

type ValueFN<V, R> = (value: V) => R;

export const get = <T>(cell: Cell<T>) => cell.get();
export const set = <T>(cell: Cell<T>, value: T) => cell.set(value);
export const update = <T>(cell: Cell<T>, updater: (value: T) => T) => cell.update(updater);
export const subscribe = <T>(cell: Cell<T>, subscription: (value: T) => void) => cell.subscribe(subscription);
export const clone = <T>(cell: Cell<T>) => cell.clone();

export function map<T, U>(cell: Cell<T>, mapper: ValueFN<T, U>): Cell<U>;
export function map<T, U>(mapper: ValueFN<T, U>): (cell: Cell<T>) => Cell<U>;
export function map<T, U>(mapperOrCell: Cell<T> | ValueFN<T, U>, _mapper?: ValueFN<T, U>) {
    const mapper = isCell(mapperOrCell) ? _mapper! : mapperOrCell;
    const resolver = (cell: Cell<T>) => cell.map(mapper);
    if(isCell(mapperOrCell)) {
        return resolver(mapperOrCell);
    }
    return resolver;
}

export function fold<T, U>(cell: Cell<T>, mapper: ValueFN<T, U>): Cell<U>;
export function fold<T, U>(mapper: ValueFN<T, U>): (cell: Cell<T>) => Cell<U>;
export function fold<T, U>(mapperOrCell: Cell<T> | ValueFN<T, U>, _mapper?: ValueFN<T, U>) {
    const mapper = isCell(mapperOrCell) ? _mapper! : mapperOrCell;
    const resolver = (cell: Cell<T>) => cell.fold(mapper);
    if(isCell(mapperOrCell)) {
        return resolver(mapperOrCell);
    }
    return resolver;
}