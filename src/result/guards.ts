import {TypeGuard, isObject} from '@lambda-fn/type-guards';
import {Result, Ok, Err} from './result';
import {GUARD, VALUE, ResultKind} from './internal';
import {makeDescriptor, getSymbolFieldValue} from '../_util';

const checkResult = (maybeResult: unknown, kind: ResultKind) => isObject(maybeResult) && getSymbolFieldValue(maybeResult, GUARD) === kind;
const isOkWithInternal = <T>(guard: TypeGuard<T>, maybeOk: unknown): maybeOk is Ok<T> => isOk(maybeOk) && guard(getSymbolFieldValue(maybeOk, VALUE));
const isErrWithInternal = <E>(guard: TypeGuard<E>, maybeErr: unknown): maybeErr is Err<E> => isErr(maybeErr) && guard(getSymbolFieldValue(maybeErr, VALUE));
const isResultWithInternal = <T, E>(
    guardOk: TypeGuard<T>,
    guardErr: TypeGuard<E>,
    maybeResult: unknown
): maybeResult is Result<T, E> => isOkWithInternal(guardOk, maybeResult) || isErrWithInternal(guardErr, maybeResult);

export const isOk = (maybeOk: unknown): maybeOk is Ok<unknown> => checkResult(maybeOk, ResultKind.Ok);
export const isErr = (maybeErr: unknown): maybeErr is Err<unknown> => checkResult(maybeErr, ResultKind.Err);
export const isResult = (maybeResult: unknown): maybeResult is Result<unknown, unknown> => isOk(maybeResult) || isErr(maybeResult);

export const isOkWith = <T>(guard: (v: unknown) => v is T) => (maybeOk: unknown): maybeOk is Ok<T> => isOkWithInternal(guard, maybeOk);
export const isErrWith = <E>(guard: (e: unknown) => e is E) => (maybeErr: unknown): maybeErr is Err<E> => isErrWithInternal(guard, maybeErr);
export const isResultWith = <T, E>(guardOk: (v: unknown) => v is T, guardErr: (e: unknown) => e is E) => (
    (maybeResult: unknown): maybeResult is Result<T, E> => isResultWithInternal(guardOk, guardErr, maybeResult)
);

Object.defineProperties(Result, {
    isOk: makeDescriptor(isOk),
    isErr: makeDescriptor(isErr),
    isResult: makeDescriptor(isResult),
    isOkWith: makeDescriptor(isOkWithInternal),
    isErrWith: makeDescriptor(isErrWithInternal),
    isResultWith:  makeDescriptor(isResultWithInternal)
});