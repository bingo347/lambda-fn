import {Some, None, Option, taggerSome, taggerNone} from './types';

export const isSome = (maybeSome: unknown): maybeSome is Some<unknown> => taggerSome.$(maybeSome);
export const isNone = (maybeNone: unknown): maybeNone is None => taggerNone.$(maybeNone);
export const isOption = (maybeOption: unknown): maybeOption is Option<unknown> => isSome(maybeOption) || isNone(maybeOption);

export function isSomeWith<T>(guard: (v: unknown) => v is T) {
    return (maybeSome: unknown): maybeSome is Some<T> => isSome(maybeSome) && guard(maybeSome.v);
}

export function isOptionWith<T>(guard: (v: unknown) => v is T) {
    const isSomeWithT = isSomeWith(guard);
    return (maybeOption: unknown): maybeOption is Option<T> => isSomeWithT(maybeOption) || isNone(maybeOption);
}

export function assert<T>(option: Option<T>, msg?: string): asserts option is Some<T> {
    if(isNone(option)) {
        throw new TypeError(msg || 'Called assert for Option on a None value');
    }
    return true as any as void;
}