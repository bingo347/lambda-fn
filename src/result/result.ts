import {TypeGuard} from '@lambda-fn/type-guards';
import {GUARD, VALUE, ResultKind, makeResult} from './internal';
import {Mapper, makeDescriptor} from '../_util';

export interface ResultStatic {
    Ok<T>(value: T): Ok<T>;
    Err<E>(error: E): Err<E>;
    tryCatch<T, E>(f: () => T, onError?: Mapper<unknown, E>): Result<T, E>;
    isOk(maybeOk: unknown): maybeOk is Ok<unknown>;
    isErr(maybeErr: unknown): maybeErr is Err<unknown>;
    isResult(maybeResult: unknown): maybeResult is Result<unknown, unknown>;
    isOkWith<T>(guard: TypeGuard<T>, maybeOk: unknown): maybeOk is Ok<T>;
    isErrWith<E>(guard: TypeGuard<E>, maybeErr: unknown): maybeErr is Err<E>;
    isResultWith<T, E>(guardOk: TypeGuard<T>, guardErr: TypeGuard<E>, maybeResult: unknown): maybeResult is Result<T, E>;
}

export interface ResultInstance<T, E> {
    expect(message: string | Error): T;
    unwrap(): T;
    unwrapOr<U>(defaultValue: U): T | U;
    unwrapOrElse<U>(lazy: () => U): T | U;
    clone(): Result<T, E>;
    andThen<U, O>(f: Mapper<T, Result<U, O>>): Result<U, E | O>;
    orElse<U, O>(f: Mapper<E, Result<U, O>>): Result<T | U, O>;
    and<U>(other: Result<U, E>): Result<U, E>;
    or<O>(other: Result<T, O>): Result<T, O>;
    contains(value: T): boolean;
    containsErr(error: E): boolean;
    map<R>(mapper: Mapper<T, R>): Result<R, E>;
    mapErr<R>(mapper: Mapper<E, R>): Result<T, R>;
    match<R>(onOk: Mapper<T, R>, onErr: Mapper<E, R>): R;
    flat<U, O>(this: Result<Result<U, O>, E>): Result<U, E | O>
    apply<U, R, O>(this: Result<Mapper<U, R>, E>, target: Result<U, O>): Result<R, E | O>;
}

export interface Ok<T, E = never> extends ResultInstance<T, E> {
    readonly [GUARD]: ResultKind.Ok;
    readonly [VALUE]: T;
}

export interface Err<E, T = never> extends ResultInstance<T, E> {
    readonly [GUARD]: ResultKind.Err;
    readonly [VALUE]: E;
}

export type Result<T, E> = Ok<T, E> | Err<E, T>;

/* eslint-disable @typescript-eslint/no-redeclare */
export const Ok = <T>(value: T): Ok<T> => makeResult(ResultKind.Ok, value);
export const Err = <E>(error: E): Err<E> => makeResult(ResultKind.Err, error);
export const Result = Object.defineProperties({}, {
/* eslint-enable @typescript-eslint/no-redeclare */
    Ok: makeDescriptor(Ok),
    Err: makeDescriptor(Err)
}) as ResultStatic;
