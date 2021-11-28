import type {Primitive} from './primitive';
import type {Strong} from './strongTypes';

/** String representation of any type */
export type AsString<T, Default extends string = string> = T extends Exclude<Primitive, symbol>
    ? `${T}`
    : T extends {toString(): infer S}
        ? Strong<S, string, Default>
        : Default;

/** Convert any value to string representation with strong types */
export const asString = <T>(value: T): AsString<T> =>
    String(value) as AsString<T>;

/**
 * Checks input type is string
 * @returns input type if it is string or '' otherwise
 */
export type StrongString<Input> = Strong<Input, string, AsString<Input, ''>>;
