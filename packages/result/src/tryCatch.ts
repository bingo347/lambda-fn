import {Result, Ok, Err} from './result';
import type {Mapper} from './_util';
import {makeDescriptor} from './_util';

const defaultOnError = <E>(e: unknown): E =>
    (e instanceof Error ? e : new Error(String(e))) as unknown as E;

export function tryCatch<T, E>(f: () => T, onError?: Mapper<unknown, E>): Result<T, E> {
    try {
        return Ok(f());
    } catch (e) {
        return Err((onError || defaultOnError)(e));
    }
}

Object.defineProperty(Result, 'tryCatch', makeDescriptor(tryCatch));
