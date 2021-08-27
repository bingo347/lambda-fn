import type {TypeGuard} from '@lambda-fn/type-guards';
import type {Mapper} from './_util';
import {makeDescriptor} from './_util';
import type {FromNullableReturnType} from './fromNullable';
import type {GUARD, VALUE} from './internal';
import {OptionKind, makeOption, patch, checkPatchValue} from './internal';

export interface OptionStatic {
    fromNullable<T>(value: T): FromNullableReturnType<T>;
    Some<T>(value: T): Some<T>;
    None: None;
    isOption(maybeOption: unknown): maybeOption is Option<unknown>;
    isOptionWith<T>(guard: TypeGuard<T>, maybeOption: unknown): maybeOption is Option<T>;
    isSome(maybeSome: unknown): maybeSome is Some<unknown>;
    isSomeWith<T>(guard: TypeGuard<T>, maybeSome: unknown): maybeSome is Some<T>;
    isNone(maybeNone: unknown): maybeNone is None;
}

export interface OptionInstance<T> {
    expect(message: string | Error): T;
    unwrap(): T;
    unwrapOr<U>(defaultValue: U): T | U;
    unwrapOrElse<U>(lazy: () => U): T | U;
    clone(): Option<T>;
    andThen<U>(f: Mapper<T, Option<U>>): Option<U>;
    orElse<U>(f: () => Option<U>): Option<T | U>;
    and<U>(other: Option<U>): Option<U>;
    or<U>(other: Option<U>): Option<T | U>;
    xor<U>(other: Option<U>): Option<T | U>;
    contains(value: T): boolean;
    filter(predicate: (value: T) => boolean): Option<T>;
    map<R>(mapper: Mapper<T, R>): Option<R>;
    match<R>(onSome: Mapper<T, R>, onNone: () => R): R;
    zip<U>(other: Option<U>): Option<[T, U]>;
    zipWith<U, R>(other: Option<U>, mapper: (a: T, b: U) => R): Option<R>;
    flat<U>(this: Option<Option<U>>): Option<U>;
    apply<U, R>(this: Option<Mapper<U, R>>, target: Option<U>): Option<R>;
}

export interface Some<T> extends OptionInstance<T> {
    readonly [GUARD]: OptionKind.Some;
    readonly [VALUE]: T;
}

export interface None<T = never> extends OptionInstance<T> {
    readonly [GUARD]: OptionKind.None;
}

export type Option<T> = Some<T> | None<T>;

export const Some = <T>(value: T): Some<T> =>
    makeOption(OptionKind.Some, value);
export const None = makeOption(OptionKind.None);
export const Option = Object.defineProperties({}, {
    Some: makeDescriptor(Some),
    None: makeDescriptor(None),
}) as OptionStatic;

patch((kind, value) =>
    (checkPatchValue(value, kind)
        ? {
            toString: () =>
                `Some( ${String(value)} )`,
        }
        : {
            toString: () =>
                'None',
        }) as Option<NonNullable<typeof value>>, false);
