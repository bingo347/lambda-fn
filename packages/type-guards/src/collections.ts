import type {AnyFn} from '@lambda-fn/basis';
import {makeInstanceofGuard} from './instanceof';
import {isFunction, isObject} from './typeof';
import type {TypeGuard} from './types';

const every = (guard: AnyFn<boolean>, ...values: unknown[]) =>
    values.every(guard);

/** Guard for Array type */
export const isArray = (v: unknown): v is unknown[] =>
    Array.isArray(v);

/**
 * Guard for Array type with concrete contents
 * @param guard Contents guard
 */
export const isArrayWith = <T>(guard: TypeGuard<T>, v: unknown): v is T[] =>
    isArray(v) && every(guard, ...v);

/** Guard for Iterable type */
export const isIterable = (v: unknown): v is Iterable<unknown> =>
    isObject(v) && isFunction(v[Symbol.iterator]);

/**
 * Guard for Iterable type with concrete contents
 * @param guard Contents guard
 */
export const isIterableWith = <T>(guard: TypeGuard<T>, v: unknown): v is Iterable<T> =>
    isIterable(v) && every(guard, ...v);

/** Guard for Set type */
export const isSet = /*@__PURE__*/makeInstanceofGuard(Set);

/**
 * Guard for Set type with concrete contents
 * @param guard Contents guard
 */
export const isSetWith = <T>(guard: TypeGuard<T>, v: unknown): v is Set<T> =>
    isSet(v) && every(guard, ...v.values());

/** Guard for Map type */
export const isMap = /*@__PURE__*/makeInstanceofGuard(Map);

/**
 * Guard for Map type with concrete contents
 * @param guard Contents guard
 */
export const isMapWith = <K, V>(guard: TypeGuard<[K, V], [unknown, unknown]>, v: unknown): v is Map<K, V> =>
    isMap(v) && every(guard, ...v.entries());
