import type {Primitive} from './primitive';
import type {Strong} from './strongTypes';

export type AsString<T, Default extends string = string> = T extends Exclude<Primitive, symbol> ? `${T}` : Default;

type AsStringReturnType<T> = AsString<T, T extends {toString(): infer S}
    ? Strong<S, string, string>
    : string>;
export const asString = <T>(value: T): AsStringReturnType<T> =>
    String(value) as AsStringReturnType<T>;

export type StrongString<Input> = Strong<Input, string, AsString<Input, ''>>;
