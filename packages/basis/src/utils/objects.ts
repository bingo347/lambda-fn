import type {AsString} from './strings';
import type {StrongPropertyDescriptor, StrongPropertyDescriptorMap} from './strongTypes';
import type {UnionToIntersection} from './transformTypes';

// eslint-disable-next-line @typescript-eslint/ban-types
export type EmptyObject = {};

/** Shorthand for Record with any possible keys */
export type URecord<T = unknown> = Record<PropertyKey, T>;

/** Shorthand for Record with string keys */
export type SRecord<T = unknown> = Record<string, T>;

/** Shorthand for Record with number keys */
export type NRecord<T = unknown> = Record<number, T>;

/** Strong variant of `keyof` operator */
export type Keys<T> = AsString<Exclude<keyof T, symbol>>[];

/**
 * `Object.keys` / `Object.getOwnPropertyNames` with strong types
 * @param target Any object
 * @param includeNonEnumerable Set it to `true` for include non enumerable keys
 * @returns Keys array
 */
export const keys = <T>(target: T, includeNonEnumerable = false): Keys<T> =>
    (includeNonEnumerable
        ? Object.getOwnPropertyNames(target)
        : Object.keys(target)) as Keys<T>;

/**
 * Helper for set property to object
 * @param target Any object
 * @param key Object property key
 * @param value Property value
 * @returns target
 */
export const set = <T extends EmptyObject, K extends keyof T>(target: T, key: K, value: T[K]): T => {
    // eslint-disable-next-line no-param-reassign
    target[key] = value;
    return target;
};

/** `Object.assign` with strong types */
export const assign = Object.assign as (<Target, Sources extends URecord[]>(
    target: Target,
    ...sources: Sources
) => UnionToIntersection<Target | Sources[number]>);

/** `Object.defineProperty` with strong types */
export const defineProperty = <T, K extends keyof T>(
    target: T,
    property: K,
    descriptor: StrongPropertyDescriptor<T, K>,
): T =>
    Object.defineProperty(target, property, descriptor);

/** `Object.defineProperties` with strong types */
export const defineProperties = <T>(target: T, properties: StrongPropertyDescriptorMap<T>): T =>
    Object.defineProperties(target, properties as PropertyDescriptorMap);
