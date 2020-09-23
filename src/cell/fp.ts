import type {Cell} from './cell';

export const get = <T>(cell: Cell<T>) => cell.get();
export const set = <T>(cell: Cell<T>, value: T) => cell.set(value);
export const update = <T>(cell: Cell<T>, updater: (value: T) => T) => cell.update(updater);
export const clone = <T>(cell: Cell<T>) => cell.clone();
export const map = <T, U>(mapper: (value: T) => U) => (cell: Cell<T>) => cell.map(mapper);
export const fold = <T, U>(mapper: (value: T) => U) => (cell: Cell<T>) => cell.fold(mapper);