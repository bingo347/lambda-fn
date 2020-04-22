import {Result} from './types';
import {isOk, isErr, assert} from './guards';
import {ok, err} from './builders';
import {get} from '../_util';

export function expect<T>(result: Result<T, any>, msg: string): T {
    if(isErr(result)) {
        assert(err(new TypeError(msg)));
    }
    return get(result);
}

export function unwrap<T, E>(result: Result<T, E>): T {
    assert(result);
    return get(result);
}

export function unwrapOr<T>(defaultValue: T) {
    return <E>(result: Result<T, E>): T => (isOk(result) ? get(result) : defaultValue);
}

export function unwrapOrElse<T>(lazy: () => T) {
    return <E>(result: Result<T, E>): T => (isOk(result) ? get(result) : lazy());
}

export function and<T1, T2, E>(r1: Result<T1, E>, r2: Result<T2, E>): Result<[T1, T2], E>;
export function and<T1, T2, T3, E>(r1: Result<T1, E>, r2: Result<T2, E>, r3: Result<T3, E>): Result<[T1, T2, T3], E>;
export function and<T1, T2, T3, T4, E>(r1: Result<T1, E>, r2: Result<T2, E>, r3: Result<T3, E>, r4: Result<T4, E>): Result<[T1, T2, T3, T4], E>;
export function and<T1, T2, T3, T4, T5, E>(r1: Result<T1, E>, r2: Result<T2, E>, r3: Result<T3, E>,
    r4: Result<T4, E>, r5: Result<T5, E>): Result<[T1, T2, T3, T4, T5], E>;
export function and<T1, T2, T3, T4, T5, T6, E>(r1: Result<T1, E>, r2: Result<T2, E>, r3: Result<T3, E>,
    r4: Result<T4, E>, r5: Result<T5, E>, r6: Result<T6, E>): Result<[T1, T2, T3, T4, T5, T6], E>;
export function and<T1, T2, T3, T4, T5, T6, T7, E>(r1: Result<T1, E>, r2: Result<T2, E>, r3: Result<T3, E>,
    r4: Result<T4, E>, r5: Result<T5, E>, r6: Result<T6, E>, r7: Result<T7, E>): Result<[T1, T2, T3, T4, T5, T6, T7], E>;
export function and<T1, T2, T3, T4, T5, T6, T7, T8, E>(r1: Result<T1, E>, r2: Result<T2, E>, r3: Result<T3, E>,
    r4: Result<T4, E>, r5: Result<T5, E>, r6: Result<T6, E>, r7: Result<T7, E>, r8: Result<T8, E>): Result<[T1, T2, T3, T4, T5, T6, T7, T8], E>;
export function and<T1, T2, T3, T4, T5, T6, T7, T8, T9, E>(r1: Result<T1, E>, r2: Result<T2, E>, r3: Result<T3, E>,
    r4: Result<T4, E>, r5: Result<T5, E>, r6: Result<T6, E>, r7: Result<T7, E>, r8: Result<T8, E>,
    r9: Result<T9, E>): Result<[T1, T2, T3, T4, T5, T6, T7, T8, T9], E>;
export function and<TS extends any[], E>(...results: [Result<TS[number], E>, Result<TS[number], E>, ...Result<TS[number], E>[]]): Result<TS, E>;
export function and<E>(...results: Result<any, E>[]) {
    return (results.every(isOk)
        ? ok(results.map(get))
        : err(get(results.find(isErr)!))
    );
}

export function andThen<T, E, R>(f: (value: T) => Result<R, E>) {
    return (result: Result<T, E>): Result<R, E> => (isOk(result)
        ? f(get(result))
        : err(get(result))
    );
}

export function or<T1, T2, E>(r1: Result<T1, E>, r2: Result<T2, E>): Result<T1 | T2, E>;
export function or<T1, T2, T3, E>(r1: Result<T1, E>, r2: Result<T2, E>, r3: Result<T3, E>): Result<T1 | T2 | T3, E>;
export function or<T1, T2, T3, T4, E>(r1: Result<T1, E>, r2: Result<T2, E>, r3: Result<T3, E>, r4: Result<T4, E>): Result<T1 | T2 | T3 | T4, E>;
export function or<T1, T2, T3, T4, T5, E>(r1: Result<T1, E>, r2: Result<T2, E>, r3: Result<T3, E>, r4: Result<T4, E>, r5: Result<T5, E>): Result<T1 | T2 | T3 | T4 | T5, E>;
export function or<T1, T2, T3, T4, T5, T6, E>(r1: Result<T1, E>, r2: Result<T2, E>, r3: Result<T3, E>, r4: Result<T4, E>,
    r5: Result<T5, E>, r6: Result<T6, E>): Result<T1 | T2 | T3 | T4 | T5 | T6, E>;
export function or<T1, T2, T3, T4, T5, T6, T7, E>(r1: Result<T1, E>, r2: Result<T2, E>, r3: Result<T3, E>, r4: Result<T4, E>,
    r5: Result<T5, E>, r6: Result<T6, E>, r7: Result<T7, E>): Result<T1 | T2 | T3 | T4 | T5 | T6 | T7, E>;
export function or<T1, T2, T3, T4, T5, T6, T7, T8, E>(r1: Result<T1, E>, r2: Result<T2, E>, r3: Result<T3, E>, r4: Result<T4, E>,
    r5: Result<T5, E>, r6: Result<T6, E>, r7: Result<T7, E>, r8: Result<T8, E>): Result<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8, E>;
export function or<T1, T2, T3, T4, T5, T6, T7, T8, T9, E>(r1: Result<T1, E>, r2: Result<T2, E>, r3: Result<T3, E>, r4: Result<T4, E>,
    r5: Result<T5, E>, r6: Result<T6, E>, r7: Result<T7, E>, r8: Result<T8, E>, r9: Result<T9, E>): Result<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9, E>;
export function or<TS extends any[], E>(...results: [Result<TS[number], E>, Result<TS[number], E>, ...Result<TS[number], E>[]]): Result<TS[number], E>;
export function or<E>(...results: Result<any, E>[]) {
    const firstOk = results.find(isOk);
    return firstOk ? ok(get(firstOk)) : err(get(results[0]));
}

export function orElse<T, E, O>(f: (error: E) => Result<T, O>) {
    return (result: Result<T, E>): Result<T, O> => (isOk(result)
        ? ok(get(result))
        : f(get(result))
    );
}

export function contains<T>(value: T) {
    return (result: Result<T, any>): boolean => (isOk(result) && get(result) === value);
}

export function containsErr<E>(error: E) {
    return (result: Result<any, E>): boolean => (isErr(result) && get(result) === error);
}

export function map<T, R>(mapper: (value: T) => R) {
    return <E>(result: Result<T, E>): Result<R, E> => (isOk(result) ? ok(mapper(get(result))) : err(get(result)));
}

export function mapErr<E, O>(mapper: (error: E) => O) {
    return <T>(result: Result<T, E>): Result<T, O> => (isErr(result) ? err(mapper(get(result))) : ok(get(result)));
}

export function mapOr<T, R>(defaultValue: R, mapper: (value: T) => R) {
    return <E>(result: Result<T, E>): R => (isOk(result) ? mapper(get(result)) : defaultValue);
}

export function flat<T, E>(result: Result<Result<T, E>, E>): Result<T, E> {
    return (isOk(result)
        ? get(result)
        : err(get(result))
    );
}


export function match<T, E, R>(onOk: (value: T) => R, onErr: (error: E) => R) {
    return (result: Result<T, E>): R => (isOk(result) ? onOk(get(result)) : onErr(get(result)));
}

export function clone<T, E>(result: Result<T, E>): Result<T, E> {
    return (isOk(result) ? ok(get(result)) : err(get(result)));
}