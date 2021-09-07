import {asFunction} from './functions';
import type {Strong} from './strongTypes';

export type StrongBoolean<Input> = Strong<Input, boolean, false>;

export type Conditional<Condition extends boolean, TrueType, FalseType = never> =
    Condition extends true ? TrueType : FalseType;

export const True = asFunction(true as const);

export const False = asFunction(false as const);

// eslint-disable-next-line eslint-comments/no-restricted-disable
// eslint-disable-next-line @typescript-eslint/no-magic-numbers -- bigint cannot be excluded
export type Falsy = false | 0 | 0n | null | undefined | '';

export type AsBoolean<T> = T extends Falsy ? false : true;

export const asBoolean = <T>(value: T): AsBoolean<T> =>
    Boolean(value) as AsBoolean<T>;
