import type {AnyFn} from './functions';
import type {AsString} from './strings';
import type {StrongPropertyDescriptor, StrongPropertyDescriptorMap} from './strongTypes';
import type {UnionToIntersection} from './transformTypes';

// eslint-disable-next-line @typescript-eslint/ban-types
export type EmptyObject = {};

export type URecord<T = unknown> = Record<PropertyKey, T>;

export type SRecord<T = unknown> = Record<string, T>;

export type NRecord<T = unknown> = Record<number, T>;

export type Keys<T> = AsString<Exclude<keyof T, symbol>>[];

export const keys = <T>(target: T, includeNonEnumerable = false): Keys<T> =>
    (includeNonEnumerable
        ? Object.getOwnPropertyNames(target)
        : Object.keys(target)) as Keys<T>;

export const set = <T extends URecord | AnyFn, K extends keyof T>(target: T, key: K, value: T[K]): T => {
    // eslint-disable-next-line no-param-reassign
    target[key] = value;
    return target;
};

export const assign = Object.assign as (<Target, Sources extends URecord[]>(
    target: Target,
    ...sources: Sources
) => UnionToIntersection<Target | Sources[number]>);

export const defineProperty = <T, K extends keyof T>(
    target: T,
    property: K,
    descriptor: StrongPropertyDescriptor<T, K>,
): T =>
    Object.defineProperty(target, property, descriptor);

export const defineProperties = <T>(target: T, properties: StrongPropertyDescriptorMap<T>): T =>
    Object.defineProperties(target, properties as PropertyDescriptorMap);
