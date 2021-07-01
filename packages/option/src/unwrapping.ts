import type {Option, Some, None} from './option';
import {GUARD, OptionKind, patch, checkPatchValue, isSomeKind, isNoneKind} from './internal';
import {_assert, getSymbolFieldValue} from './_util';

const makeAssertionErrorMessage = (
    method: 'assert' | 'assertNone' | 'unwrap',
    kind: OptionKind
) =>
    `Called ${method} for Option on a ${isNoneKind(kind) ? 'Some' : 'None'} value`;
const always = <T>(value: T) =>
    () =>
        value;

export function assertSome<T>(option: Option<T>, message?: string): asserts option is Some<T> {
    const kind = getSymbolFieldValue(option, GUARD);
    _assert(
        isSomeKind(kind),
        message ?? makeAssertionErrorMessage('assert', kind),
        TypeError
    );
}

export function assertNone(option: Option<unknown>, message?: string): asserts option is None {
    const kind = getSymbolFieldValue(option, GUARD);
    _assert(
        isNoneKind(kind),
        message ?? makeAssertionErrorMessage('assertNone', kind),
        TypeError
    );
}

export const expect = <T>(option: Option<T>, message: string): T =>
    option.expect(message);
export const unwrap = <T>(option: Option<T>): T =>
    option.unwrap();
export const unwrapOr = <U>(defaultValue: U) =>
    <T>(option: Option<T>): T | U =>
        option.unwrapOr(defaultValue);
export const unwrapOrElse = <U>(lazy: () => U) =>
    <T>(option: Option<T>): T | U =>
        option.unwrapOrElse(lazy);
export const contains = <T>(value: T) =>
    (option: Option<T>): boolean =>
        option.contains(value);
export const match = <T, R>(onSome: (value: T) => R, onNone: () => R) =>
    (option: Option<T>): R =>
        option.match(onSome, onNone);

patch((kind, value) =>
    (checkPatchValue(value, kind)
        ? {
            expect:       always(value),
            unwrap:       always(value),
            unwrapOr:     always(value),
            unwrapOrElse: always(value),
            contains:     v =>
                v === value,
            match:        onSome =>
                onSome(value),
        }
        : {
            expect:       message =>
                void _assert(false, message as Error) as never,
            unwrap:       () =>
                void _assert(false, makeAssertionErrorMessage('unwrap', OptionKind.Some), TypeError) as never,
            unwrapOr:     defaultValue =>
                defaultValue,
            unwrapOrElse: lazy =>
                lazy(),
            contains:     always(false),
            match:        (_, onNone) =>
                onNone(),
        }), false);
