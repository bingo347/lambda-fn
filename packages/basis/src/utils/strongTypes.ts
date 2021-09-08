import {identity} from './functions';

export type Strong<Input, Base, Default extends Base = never> = Input extends Base ? Input : Default;

declare const tag: unique symbol;
export type Opaque<T, Tag> = T & {[tag]: Tag};

type OpaqueFactory<T, Tag> = {
    readonly '@Type': Opaque<T, Tag>;
    (value: T): Opaque<T, Tag>;
};
export const Opaque = <T, Tag>(): OpaqueFactory<T, Tag> =>
    identity as OpaqueFactory<T, Tag>;

export type StrongPropertyDescriptor<T, K extends keyof T> = {
    configurable?: boolean;
    enumerable?: boolean;
    writable?: boolean;
    value: T[K];
} | {
    configurable?: boolean;
    enumerable?: boolean;
    get(this: T): T[K];
    set?(this: T, value: T[K]): void;
} | {
    configurable?: boolean;
    enumerable?: boolean;
    get?(this: T): T[K];
    set(this: T, value: T[K]): void;
};

export type StrongPropertyDescriptorMap<T> = {
    [K in keyof T]?: StrongPropertyDescriptor<T, K>;
};
