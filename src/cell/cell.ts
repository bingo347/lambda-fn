import {TypeGuard, isObject} from '@lambda-fn/type-guards';
import {assign} from '../_util';

type ValueFN<V, R> = (value: V) => R;
const enum CellKind { Cell }
const GUARD = Symbol();

export interface CellStatic {
    <T>(initialValue: T): Cell<T>;
    isCell(maybeCell: unknown): maybeCell is Cell<unknown>;
    isCellWith<T>(guard: TypeGuard<T>, maybeCell: unknown): maybeCell is Cell<T>;
}

export interface Cell<T> {
    [GUARD]: CellKind;
    get(): T;
    set(value: T): void;
    update(updater: (value: T) => T): void;
    subscribe(subscription: (value: T) => void): () => void;
    clone(): Cell<T>;
    map<U>(mapper: (value: T) => U): Cell<U>;
    fold<U>(mapper: (value: T) => U): U;
}

export const isCell = (maybeCell: unknown): maybeCell is Cell<unknown> => isObject(maybeCell) && maybeCell[GUARD as any] === CellKind.Cell;
export const isCellWith = <T>(guard: TypeGuard<T>, maybeCell: unknown): maybeCell is Cell<T> => isCell(maybeCell) && maybeCell.fold(guard);

// eslint-disable-next-line max-lines-per-function
export const Cell: CellStatic = assign(<T>(initialValue: T): Cell<T> => {
    const get = () => currentValue;
    const set = (value: T) => {
        if(value === currentValue) { return; }
        currentValue = value;
        for(const subscription of subscriptions.values()) {
            subscription(currentValue);
        }
    };
    const update = (updater: ValueFN<T, T>) => set(updater(currentValue));
    const subscribe = (subscription: ValueFN<T, void>) => (
        subscriptions.add(subscription),
        () => void subscriptions.delete(subscription)
    );
    const clone = () => Cell(currentValue);
    const map = <U>(mapper: ValueFN<T, U>) => Cell(mapper(currentValue));
    const fold = <U>(mapper: ValueFN<T, U>) => mapper(currentValue);
    const subscriptions = new Set<ValueFN<T, void>>();
    let currentValue = initialValue;
    return {get, set, update, subscribe, clone, map, fold, [GUARD]: CellKind.Cell};
}, {isCell, isCellWith});