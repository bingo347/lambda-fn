import {isNonNullable} from '@lambda-fn/type-guards';
import {makeDescriptor} from './_util';
import {Option, Some, None} from './option';

type MatchNullable<T, WhenNullable, WhenNonNullable>
    = T extends null | undefined
        ? WhenNullable
        : WhenNonNullable;

export type FromNullableReturnType<T> = MatchNullable<
T,
None<MatchNullable<T, never, NonNullable<T>>>,
Some<MatchNullable<T, never, NonNullable<T>>>
>;
export const fromNullable = <T>(value: T): FromNullableReturnType<T> =>
    (isNonNullable(value) ? Some(value) : None) as FromNullableReturnType<T>;

Object.defineProperty(Option, 'fromNullable', makeDescriptor(fromNullable));
