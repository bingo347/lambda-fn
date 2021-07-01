import type {Result} from './result';
import {Ok, Err} from './result';
import {assertOk} from './unwrapping';
import {isOk, isErr} from './guards';
import {VALUE} from './internal';
import type {Mapper} from './_util';
import {getSymbolFieldValue} from './_util';

/** @deprecated use Ok */
export const ok = Ok;

/** @deprecated use Err */
export const err = Err;

/** @deprecated use assertOk */
export const assert = assertOk;

/** @deprecated use chain with .map(...).unwrapOr(...) */
export const mapOr = <T, R>(defaultValue: R, mapper: Mapper<T, R>) =>
    <E>(result: Result<T, E>): R =>
        result.map(mapper).unwrapOr(defaultValue);

/** @deprecated */
export function and<T1, T2, E>(r1: Result<T1, E>, r2: Result<T2, E>): Result<[T1, T2], E>;
/** @deprecated */
export function and<T1, T2, T3, E>(r1: Result<T1, E>, r2: Result<T2, E>, r3: Result<T3, E>): Result<[T1, T2, T3], E>;
/** @deprecated */
export function and<T1, T2, T3, T4, E>(r1: Result<T1, E>, r2: Result<T2, E>, r3: Result<T3, E>,
    r4: Result<T4, E>): Result<[T1, T2, T3, T4], E>;
/** @deprecated */
export function and<T1, T2, T3, T4, T5, E>(r1: Result<T1, E>, r2: Result<T2, E>, r3: Result<T3, E>,
    r4: Result<T4, E>, r5: Result<T5, E>): Result<[T1, T2, T3, T4, T5], E>;
/** @deprecated */
export function and<T1, T2, T3, T4, T5, T6, E>(r1: Result<T1, E>, r2: Result<T2, E>, r3: Result<T3, E>,
    r4: Result<T4, E>, r5: Result<T5, E>, r6: Result<T6, E>): Result<[T1, T2, T3, T4, T5, T6], E>;
/** @deprecated */
export function and<T1, T2, T3, T4, T5, T6, T7, E>(r1: Result<T1, E>, r2: Result<T2, E>, r3: Result<T3, E>,
    r4: Result<T4, E>, r5: Result<T5, E>, r6: Result<T6, E>,
    r7: Result<T7, E>): Result<[T1, T2, T3, T4, T5, T6, T7], E>;
/** @deprecated */
export function and<T1, T2, T3, T4, T5, T6, T7, T8, E>(r1: Result<T1, E>, r2: Result<T2, E>, r3: Result<T3, E>,
    r4: Result<T4, E>, r5: Result<T5, E>, r6: Result<T6, E>,
    r7: Result<T7, E>, r8: Result<T8, E>): Result<[T1, T2, T3, T4, T5, T6, T7, T8], E>;
/** @deprecated */
export function and<T1, T2, T3, T4, T5, T6, T7, T8, T9, E>(r1: Result<T1, E>, r2: Result<T2, E>, r3: Result<T3, E>,
    r4: Result<T4, E>, r5: Result<T5, E>, r6: Result<T6, E>, r7: Result<T7, E>, r8: Result<T8, E>,
    r9: Result<T9, E>): Result<[T1, T2, T3, T4, T5, T6, T7, T8, T9], E>;
/** @deprecated */
export function and<TS extends unknown[], E>(...results: [
    Result<TS[number], E>, Result<TS[number], E>, ...Result<TS[number], E>[]]): Result<TS, E>;
export function and<E>(...results: Result<unknown, E>[]): Result<unknown[], E> {
    return (results.every(isOk)
        ? Ok(results.map(r =>
            getSymbolFieldValue(r, VALUE)))
        : Err(getSymbolFieldValue(results.find(isErr)!, VALUE))
    ) as Result<unknown[], E>;
}

/** @deprecated */
export function or<T1, T2, E>(r1: Result<T1, E>, r2: Result<T2, E>): Result<T1 | T2, E>;
/** @deprecated */
export function or<T1, T2, T3, E>(r1: Result<T1, E>, r2: Result<T2, E>, r3: Result<T3, E>): Result<T1 | T2 | T3, E>;
/** @deprecated */
export function or<T1, T2, T3, T4, E>(r1: Result<T1, E>, r2: Result<T2, E>, r3: Result<T3, E>,
    r4: Result<T4, E>): Result<T1 | T2 | T3 | T4, E>;
/** @deprecated */
export function or<T1, T2, T3, T4, T5, E>(r1: Result<T1, E>, r2: Result<T2, E>, r3: Result<T3, E>,
    r4: Result<T4, E>, r5: Result<T5, E>): Result<T1 | T2 | T3 | T4 | T5, E>;
/** @deprecated */
export function or<T1, T2, T3, T4, T5, T6, E>(r1: Result<T1, E>, r2: Result<T2, E>, r3: Result<T3, E>,
    r4: Result<T4, E>, r5: Result<T5, E>, r6: Result<T6, E>): Result<T1 | T2 | T3 | T4 | T5 | T6, E>;
/** @deprecated */
export function or<T1, T2, T3, T4, T5, T6, T7, E>(r1: Result<T1, E>, r2: Result<T2, E>, r3: Result<T3, E>,
    r4: Result<T4, E>, r5: Result<T5, E>, r6: Result<T6, E>,
    r7: Result<T7, E>): Result<T1 | T2 | T3 | T4 | T5 | T6 | T7, E>;
/** @deprecated */
export function or<T1, T2, T3, T4, T5, T6, T7, T8, E>(r1: Result<T1, E>, r2: Result<T2, E>, r3: Result<T3, E>,
    r4: Result<T4, E>, r5: Result<T5, E>, r6: Result<T6, E>,
    r7: Result<T7, E>, r8: Result<T8, E>): Result<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8, E>;
/** @deprecated */
export function or<T1, T2, T3, T4, T5, T6, T7, T8, T9, E>(r1: Result<T1, E>, r2: Result<T2, E>, r3: Result<T3, E>,
    r4: Result<T4, E>, r5: Result<T5, E>, r6: Result<T6, E>,
    r7: Result<T7, E>, r8: Result<T8, E>, r9: Result<T9, E>): Result<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9, E>;
/** @deprecated */
export function or<TS extends unknown[], E>(...results: [
    Result<TS[number], E>, Result<TS[number], E>, ...Result<TS[number], E>[]]): Result<TS[number], E>;
export function or<E>(...results: Result<unknown, E>[]): Result<unknown, E> {
    const firstOk = results.find(isOk);
    return firstOk
        ? Ok(getSymbolFieldValue(firstOk, VALUE))
        : Err(getSymbolFieldValue(results[0]!, VALUE)) as Result<unknown, E>;
}
