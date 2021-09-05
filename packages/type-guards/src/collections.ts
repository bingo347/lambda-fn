import {makeInstanceofGuard} from './instanceof';
import {isFunction, isObject} from './typeof';
import type {TypeGuard} from './types';

export const isArray = (v: unknown): v is unknown[] =>
    Array.isArray(v);

export const isArrayWith = <T>(guard: TypeGuard<T>, v: unknown): v is T[] =>
    isArray(v) && every(guard, ...v);

export const isIterable = (v: unknown): v is Iterable<unknown> =>
    isObject(v) && isFunction(v[Symbol.iterator]);

export const isIterableWith = <T>(guard: TypeGuard<T>, v: unknown): v is Iterable<T> =>
    isIterable(v) && every(guard, ...v);

export const isSet = /*@__PURE__*/makeInstanceofGuard(Set);

export const isSetWith = <T>(guard: TypeGuard<T>, v: unknown): v is Set<T> =>
    isSet(v) && every(guard, ...v.values());

export const isMap = /*@__PURE__*/makeInstanceofGuard(Map);

export const isMapWith = <K, V>(guard: TypeGuard<[K, V]>, v: unknown): v is Map<K, V> =>
    isMap(v) && every(guard, ...v.values());

const every = <G extends TypeGuard<unknown>>(guard: G, ...values: unknown[]) =>
    values.every(guard);
