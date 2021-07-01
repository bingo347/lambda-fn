import type {Result, Ok, Err, ResultInstance} from './result';
import {makeDescriptor} from './_util';

type AnyMethod<T, E> = ResultInstance<T, E>[keyof ResultInstance<T, E>];
type Implementor = [
    method: string,
    whenOk: <T, E>(value: T) => AnyMethod<T, E>,
    whenErr: <T, E>(error: E) => AnyMethod<T, E>,
    configurable: boolean,
];
const implementors: Implementor[] = [];

// eslint-disable-next-line @typescript-eslint/no-shadow
export const enum ResultKind { Ok, Err }
export const GUARD = Symbol();
export const VALUE = Symbol();
export const impl = <T, E, M extends keyof ResultInstance<T, E>>(
    method: M,
    whenOk: (value: T) => ResultInstance<T, E>[M],
    whenErr: (error: E) => ResultInstance<T, E>[M],
    configurable = true
): void => {
    implementors.push([method, whenOk as Implementor[1], whenErr as Implementor[2], configurable]);
};

export function makeResult<T>(kind: ResultKind.Ok, value: T): Ok<T>;
export function makeResult<E>(kind: ResultKind.Err, value: E): Err<E>;
export function makeResult<T, E>(kind: ResultKind, value: T | E): Result<T, E> {
    const protoResult = {} as unknown as Result<T, E>;
    Object.defineProperty(protoResult, VALUE, makeDescriptor(value, false, true));
    Object.defineProperty(protoResult, GUARD, makeDescriptor(kind, false, true));
    Object.defineProperty(protoResult, Symbol.toStringTag, {
        get: () =>
            'Result',
    });
    return implementors.reduce(mergeResultReducer<T, E>(kind, value), protoResult);
}

function mergeResultReducer<T, E>(kind: ResultKind, value: T | E) {
    return (result: Result<T, E>, [method,
        whenOk,
        whenErr,
        configurable]: Implementor) => {
        Object.defineProperty(result, method, makeDescriptor(
            (kind === ResultKind.Ok
                ? whenOk(value)
                : whenErr(value)
            ), configurable
        ));
        return result;
    };
}
