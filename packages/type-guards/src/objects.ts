import {isObjectLike, isFunction} from './typeof';
import type {TypeGuard} from './types';

const defaultGuard = <T>(_v: unknown): _v is T =>
    true;

/**
 * Create guard that checks value is object with concrete key & value
 * @param key Key that will be checked
 * @param guard Guard for property value
 * @returns Guard
 */
export const isObjectWithKey = <K extends PropertyKey, T>(
    key: K,
    guard: TypeGuard<T> = defaultGuard
) =>
    (v: unknown): v is Record<K, T> =>
        isObjectLike(v) && key in v && guard(v);

/** Guard for PromiseLike type */
export const isPromiseLike = /*@__PURE__*/isObjectWithKey('then', isFunction) as TypeGuard<PromiseLike<unknown>>;
