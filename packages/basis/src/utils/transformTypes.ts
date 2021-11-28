import type {Fn} from './functions';

/** Transforms union of types to intersection of that types */
export type UnionToIntersection<U> =
    (U extends unknown ? Fn<unknown, [U]> : never) extends Fn<unknown, [infer I]> ? I : never;

/** Checks two types are representation of the some type */
export type Equal<A, B> = A extends B ? B extends A ? true : false : false;

/** Recalculates type to simple representation */
export type Recalculate<T> = T extends unknown ? {
    [K in keyof T]: T[K];
} : never;

/** Makes some keys of type optional */
export type SelectivePartial<T, K extends keyof T> = Recalculate<
    & Required<Pick<T, Exclude<keyof T, K>>>
    & Partial<Pick<T, K>>
>;

/** Makes some keys of type required */
export type SelectiveRequired<T, K extends keyof T> = Recalculate<
    & Required<Pick<T, K>>
    & Partial<Pick<T, Exclude<keyof T, K>>>
>;

/** Selects variants of union by key-value pair */
export type SelectByKeyValue<T, Key extends keyof T, Value extends T[Key]> = Recalculate<T & {
    [_ in Key]: Value;
}>;
