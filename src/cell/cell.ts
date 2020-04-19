import {isFunction} from '@lambda-fn/type-guards';

const Tag = 'Cell';
type Tag = typeof Tag;

export type Cell<T> = {
    $: Tag;
    (): T;
    (v: T): void;
};

export function makeCell<T>(initialValue: T): Cell<T> {
    let value = initialValue;
    return Object.freeze(Object.assign((v?: T) => (v
        ? (value = v) // eslint-disable-line fp/no-mutation
        : value
    ), {$: Tag} as {$: Tag}));
}

export function isCell(maybeCell: unknown): maybeCell is Cell<unknown> {
    return isFunction(maybeCell) && (maybeCell as any).$ === Tag;
}

export function isCellWith<T>(guard: (v: unknown) => v is T): (maybeCell: unknown) => maybeCell is Cell<T> {
    return (maybeCell): maybeCell is Cell<T> => isCell(maybeCell) && guard(maybeCell());
}

export const get = <T>(cell: Cell<T>) => cell();
export const set = <T>(cell: Cell<T>, value: T) => cell(value);
export const update = <T>(cell: Cell<T>, updater: (value: T) => T) => cell(updater(cell()));
export const clone = <T>(cell: Cell<T>) => makeCell(cell());
export const map = <T, U>(mapper: (value: T) => U) => (cell: Cell<T>) => makeCell(mapper(cell()));
export const fold = <T, U>(fld: (value: T) => U) => (cell: Cell<T>) => fld(cell());