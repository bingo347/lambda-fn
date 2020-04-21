import {Ok, Err, Result, taggerOk, taggerErr} from './types';

export const isOk = (maybeOk: unknown): maybeOk is Ok<unknown> => taggerOk.$(maybeOk);
export const isErr = (maybeErr: unknown): maybeErr is Err<unknown> => taggerErr.$(maybeErr);
export const isResult = (maybeResult: unknown): maybeResult is Result<unknown, unknown> => isOk(maybeResult) || isErr(maybeResult);

export function isOkWith<T>(guard: (v: unknown) => v is T) {
    return (maybeOk: unknown): maybeOk is Ok<T> => isOk(maybeOk) && guard(maybeOk.v);
}

export function isErrWith<E>(guard: (e: unknown) => e is E) {
    return (maybeErr: unknown): maybeErr is Err<E> => isErr(maybeErr) && guard(maybeErr.v);
}

export function isResultWith<T, E>(guardOk: (v: unknown) => v is T, guardErr: (e: unknown) => e is E) {
    const isOkWithT = isOkWith(guardOk);
    const isErrWithE = isErrWith(guardErr);
    return (maybeResult: unknown): maybeResult is Result<T, E> => isOkWithT(maybeResult) || isErrWithE(maybeResult);
}

export function assert<T>(result: Result<T, any>): asserts result is Ok<T> {
    if(isErr(result)) {
        // eslint-disable-next-line fp/no-throw
        throw result.v;
    }
    return true as any as void;
}