import type {Fn} from './functions';

export type UnionToIntersection<U> =
    (U extends unknown ? Fn<unknown, [U]> : never) extends Fn<unknown, [infer I]> ? I : never;

export type Equal<A, B> = A extends B ? B extends A ? true : false : false;

export type Recalculate<T> = T extends unknown ? {
    [K in keyof T]: T[K];
} : never;

export type SelectivePartial<T, K extends keyof T> =
    & Required<Pick<T, Exclude<keyof T, K>>>
    & Partial<Pick<T, K>>;

export type SelectiveRequired<T, K extends keyof T> =
    & Required<Pick<T, K>>
    & Partial<Pick<T, Exclude<keyof T, K>>>;
