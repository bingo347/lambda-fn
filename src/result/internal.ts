import type {Ok, Err} from './result';

// eslint-disable-next-line @typescript-eslint/no-shadow
export const enum ResultKind { Ok, Err }
export const GUARD = Symbol();
export const VALUE = Symbol();

export declare function makeResult<T>(kind: ResultKind.Ok, value: T): Ok<T>;
export declare function makeResult<E>(kind: ResultKind.Err, value: E): Err<E>;
