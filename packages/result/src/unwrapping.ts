import {Result, Ok, Err} from './result';
import {GUARD, ResultKind, impl} from './internal';
import {Mapper, _assert, getSymbolFieldValue} from './_util';

const isOkKind = (kind: ResultKind) => kind === ResultKind.Ok;
const isErrKind = (kind: ResultKind) => kind === ResultKind.Err;
const makeAssertionErrorMessage = (
    method: 'assertOk' | 'assertErr' | 'unwrap',
    kind: ResultKind
) => `Called ${method} for Result on a ${isErrKind(kind) ? 'Ok' : 'Err'} value`;
const always = <T>(value: T) => () => value;

export function assertOk<T>(result: Result<T, any>, message?: string): asserts result is Ok<T> {
    const kind = getSymbolFieldValue(result, GUARD);
    _assert(
        isOkKind(kind),
        message || makeAssertionErrorMessage('assertOk', kind),
        TypeError
    );
}

export function assertErr<T>(result: Result<T, any>, message?: string): asserts result is Err<T> {
    const kind = getSymbolFieldValue(result, GUARD);
    _assert(
        isErrKind(kind),
        message || makeAssertionErrorMessage('assertErr', kind),
        TypeError
    );
}

export const expect = <T>(result: Result<T, any>, message: string): T => result.expect(message);
const expectNever = () => (message: string | Error) => _assert(false, message as Error) as never;
impl('expect', always, expectNever, false);
impl('expectErr', expectNever, always, false);

export const unwrap = <T>(result: Result<T, any>): T => result.unwrap();
const unwrapNever = (v: unknown) => () => { throw v; };
impl('unwrap', always, unwrapNever, false);
impl('unwrapErr', unwrapNever, always, false);

export const unwrapOr = <U>(defaultValue: U) => <T, E>(result: Result<T, E>): T | U => result.unwrapOr(defaultValue);
impl('unwrapOr', always, (() => defaultValue => defaultValue), false);

export const unwrapOrElse = <U>(lazy: () => U) => <T, E>(result: Result<T, E>): T | U => result.unwrapOrElse(lazy);
impl('unwrapOrElse', always, (() => lazy => lazy()), false);

export const contains = <T>(value: T) => (result: Result<T, any>): boolean => result.contains(value);
impl('contains', (value => v => v === value), always(always(false)), false);

export const containsErr = <E>(error: E) => (result: Result<any, E>): boolean => result.containsErr(error);
impl('containsErr', always(always(false)), (error => e => e === error), false);

export const match = <T, E, R>(onOk: Mapper<T, R>, onErr: Mapper<E, R>) => (result: Result<T, E>): R => result.match(onOk, onErr);
impl('match', (value => onOk => onOk(value)), (error => (_, onErr) => onErr(error)), false);
