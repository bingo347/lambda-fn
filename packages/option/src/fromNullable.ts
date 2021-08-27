import {isNonNullable} from '@lambda-fn/type-guards';
import {makeDescriptor} from './_util';
import {Option, Some, None} from './option';

type MatchNullable<T, WhenNullable, WhenNonNullable>
    // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
    = T extends null | undefined | void
        ? WhenNullable
        : WhenNonNullable;

export type FromNullableReturnType<T> = MatchNullable<
T,
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
None<MatchNullable<T, never, Exclude<T, null | undefined | void>>>,
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
Some<MatchNullable<T, never, Exclude<T, null | undefined | void>>>
>;
export const fromNullable = <T>(value: T): FromNullableReturnType<T> =>
    (isNonNullable(value) ? Some(value) : None) as FromNullableReturnType<T>;

Object.defineProperty(Option, 'fromNullable', makeDescriptor(fromNullable));
