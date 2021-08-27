import type {Mapper} from './_util';
import {makeDescriptor} from './_util';
import {Result, Ok, Err} from './result';

const defaultOnError = <E>(e: unknown): E =>
    (e instanceof Error ? e : new Error(String(e))) as unknown as E;

export function tryCatch<T, E>(f: () => T, onError?: Mapper<unknown, E>): Result<T, E> {
    // eslint-disable-next-line no-restricted-syntax
    try {
        return Ok(f());
    } catch (e: unknown) {
        return Err((onError ?? defaultOnError)(e));
    }
}

Object.defineProperty(Result, 'tryCatch', makeDescriptor(tryCatch));
