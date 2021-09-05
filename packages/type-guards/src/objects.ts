import {isObjectLike, isFunction} from './typeof';
import type {TypeGuard} from './types';

const defaultGuard = <T>(_v: unknown): _v is T =>
    true;

export const isObjectWithKey = <K extends PropertyKey, T>(
    key: K,
    guard: TypeGuard<T> = defaultGuard
) =>
    (v: unknown): v is Record<K, T> =>
        isObjectLike(v) && key in v && guard(v);

export const isPromiseLike = /*@__PURE__*/isObjectWithKey('then', isFunction) as TypeGuard<PromiseLike<unknown>>;
