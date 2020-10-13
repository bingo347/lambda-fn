import {isNonNullable} from '@lambda-fn/type-guards';
import {Option, Some, None} from './option';
import {makeDescriptor} from '../_util';

type MatchNullable<T, WhenNullable, WhenNonNullable>
    = T extends null | undefined | void
    ? WhenNullable
    : WhenNonNullable;

export type FromNullableReturnType<T> = MatchNullable<
    T,
    None<MatchNullable<T, never, Exclude<T, null | undefined | void>>>,
    Some<MatchNullable<T, never, Exclude<T, null | undefined | void>>>
>;
export const fromNullable = <T>(value: T): FromNullableReturnType<T> => (isNonNullable(value) ? Some(value) : None) as FromNullableReturnType<T>;

Object.defineProperty(Option, 'fromNullable', makeDescriptor(fromNullable));
