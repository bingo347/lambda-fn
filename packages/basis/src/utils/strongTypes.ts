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
