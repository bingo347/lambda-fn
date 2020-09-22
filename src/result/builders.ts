import {Ok, Err, Result, taggerOk, taggerErr} from './types';

export const ok = <T>(value: T): Ok<T> => taggerOk({v: value});
export const err = <E>(error: E): Err<E> => taggerErr({v: error});

const defaultOnError = <E>(e: unknown): E => (e instanceof Error ? e : new Error(String(e))) as any as E;
export function tryCatch<T, E>(f: () => T, onError?: (e: unknown) => E): Result<T, E> {
    try {
        return ok(f());
    } catch(e) {
        return err((onError || defaultOnError)(e));
    }
}