import {TypeGuard, isObject} from '@lambda-fn/type-guards';
import {Option, Some, None} from './option';
import {GUARD, OptionKind} from './internal';
import {makeDescriptor, getSymbolFieldValue} from '../_util';

// TODO: move to fp
const unwrap = <T>(option: Option<T>): T => option.unwrap();

const checkOption = (maybeOption: unknown, kind: OptionKind) => isObject(maybeOption) && getSymbolFieldValue(maybeOption, GUARD) === kind;
const isSomeWithInternal = <T>(guard: TypeGuard<T>, maybeSome: unknown): maybeSome is Some<T> => isSome(maybeSome) && guard(unwrap(maybeSome));
const isOptionWithInternal = <T>(guard: TypeGuard<T>, maybeOption: unknown): maybeOption is Option<T> => isNone(maybeOption) || isSomeWithInternal(guard, maybeOption);

export const isSome = (maybeSome: unknown): maybeSome is Some<unknown> => checkOption(maybeSome, OptionKind.Some);
export const isNone = (maybeNone: unknown): maybeNone is None => checkOption(maybeNone, OptionKind.None);
export const isOption = (maybeOption: unknown): maybeOption is Option<unknown> => isSome(maybeOption) || isNone(maybeOption);
export const isSomeWith = <T>(guard: TypeGuard<T>) => (maybeSome: unknown): maybeSome is Some<T> => isSomeWithInternal(guard, maybeSome);
export const isOptionWith = <T>(guard: TypeGuard<T>) => (maybeOption: unknown): maybeOption is Option<T> => isOptionWithInternal(guard, maybeOption);

Object.defineProperties(Option, {
    isSome: makeDescriptor(isSome),
    isNone: makeDescriptor(isNone),
    isOption: makeDescriptor(isOption),
    isSomeWith: makeDescriptor(isSomeWithInternal),
    isOptionWith: makeDescriptor(isOptionWithInternal)
});
