import {Option, Some, None} from './option';
import {GUARD, VALUE, patch, checkPatchValue, isSomeKind} from './internal';
import {getSymbolFieldValue} from './_util';

type SomeFromOption<O> = O extends Option<infer T> ? Some<T> : never;
const alwaysSome = <T>(value: T) => () => Some(value);
const alwaysNone = () => None;
const identity = <T>(value: T) => value;

export const clone = <T>(option: Option<T>): Option<T> => option.clone();
export const andThen = <T, R>(f: (value: T) => Option<R>) => (option: Option<T>): Option<R> => option.andThen(f);
export const orElse = <U>(f: () => Option<U>) => <T>(option: Option<T>): Option<U | T> => option.orElse(f);
export const xor = <T, U>(left: Option<T>, right: Option<U>): Option<T | U> => left.xor(right);
export const filter = <T>(predicate: (value: T) => boolean) => (option: Option<T>): Option<T> => option.filter(predicate);
export const map = <T, R>(mapper: (value: T) => R) => (option: Option<T>): Option<R> => option.map(mapper);

const patchSome = <T>(value: T): Partial<Option<T>> => ({
    clone: alwaysSome(value),
    andThen: f => f(value),
    orElse: alwaysSome(value),
    and: identity,
    or: alwaysSome(value),
    xor: other => (isSomeKind(getSymbolFieldValue(other, GUARD)) ? None : other),
    filter: predicate => (predicate(value) ? Some(value) : None),
    map: mapper => Some(mapper(value)),
    zip: other => (isSomeKind(getSymbolFieldValue(other, GUARD))
        ? Some([value, getSymbolFieldValue(other as SomeFromOption<typeof other>, VALUE)])
        : None
    ),
    zipWith: (other, mapper) => (isSomeKind(getSymbolFieldValue(other, GUARD))
        ? Some(mapper(value, getSymbolFieldValue(other as SomeFromOption<typeof other>, VALUE)))
        : None
    )
});
const patchNone = <T>(): Partial<Option<T>> => ({
    clone: alwaysNone,
    andThen: alwaysNone,
    orElse: f => f(),
    and: alwaysNone,
    or: identity,
    xor: other => (isSomeKind(getSymbolFieldValue(other, GUARD)) ? other : None),
    filter: alwaysNone,
    map: alwaysNone,
    zip: alwaysNone,
    zipWith: alwaysNone
});
patch((kind, value) => (checkPatchValue(value, kind) ? patchSome(value) : patchNone()), false);
