import {isFunction} from '@lambda-fn/type-guards';
import {makeTag, InferTag} from '../_util';

const tagger = makeTag('Cell');

export type Cell<T> = {
    readonly $: InferTag<typeof tagger>;
    (): T;
    (v: T): void;
};

export function makeCell<T>(initialValue: T): Cell<T> {
    let value = initialValue;
    return tagger<(v?: T) => T>((...args) => (args.length !== 0
        ? (value = args[0]!) // eslint-disable-line fp/no-mutation
        : value
    ));
}

export function isCell(maybeCell: unknown): maybeCell is Cell<unknown> {
    return isFunction(maybeCell) && tagger.$(maybeCell);
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