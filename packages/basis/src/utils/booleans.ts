import {asFunction} from './functions';
import type {Strong} from './strongTypes';

/**
 * Checks input type is boolean
 * @returns input type if it is boolean or false otherwise
 */
export type StrongBoolean<Input> = Strong<Input, boolean, false>;

/**
 * Checks condition is strongly true type
 * @returns 2nd parameter if 1st parameter is true or 3rd parameter otherwise
 */
export type Conditional<Condition extends boolean, TrueType, FalseType = never> =
    Condition extends true ? TrueType : FalseType;

/**
 * Functional representation of true
 * @returns always true
 */
export const True = asFunction(true as const);

/**
 * Functional representation of false
 * @returns always false
 */
export const False = asFunction(false as const);

/**
 * May contains all possible falsy values \
 * Notice: NaN is falsy value but hasn't literal type and not included in this type
 */
// eslint-disable-next-line eslint-comments/no-restricted-disable
// eslint-disable-next-line @typescript-eslint/no-magic-numbers -- bigint cannot be excluded
export type Falsy = false | 0 | 0n | null | undefined | '';

/**
 * Transform any input type to true or false representation
 */
export type AsBoolean<T> = T extends Falsy ? false : true;

/**
 * Transform any value to boolean representation with strong types \
 * Notice: for NaN it returns false with type true
 * @see {@link Falsy}
 * @param value Any value to transform
 * @returns true of false
 */
export const asBoolean = <T>(value: T): AsBoolean<T> =>
    Boolean(value) as AsBoolean<T>;
