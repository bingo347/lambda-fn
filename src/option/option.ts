import type {TypeGuard} from '@lambda-fn/type-guards';

const enum OptionKind { Some, None }
const GUARD = Symbol();

export interface OptionStatic {
    fromNullable<T>(value: T): Option<NonNullable<T>>;
    Some<T>(value: T): Some<T>;
    None: None;
    isOption(maybeOption: unknown): maybeOption is Option<unknown>;
    isOptionWith<T>(guard: TypeGuard<T>, maybeOption: unknown): maybeOption is Option<T>;
    isSome(maybeSome: unknown): maybeSome is Some<unknown>;
    isSomeWith<T>(guard: TypeGuard<T>, maybeSome: unknown): maybeSome is Some<T>;
    isNone(maybeNone: unknown): maybeNone is None;
}

export interface OptionInstance<T> {
    assert(this: Option<T>, msg?: string): asserts this is Some<T>;
    assertNone(this: Option<T>, msg?: string): asserts this is None;
    expect(msg: string): T;
    unwrap(): T;
    unwrapOr(defaultValue: T): T;
    unwrapOrElse(lazy: () => T): T;
    clone(): Option<T>;
    andThen<U>(f: (value: T) => Option<U>): Option<U>;
    orElse<U>(f: () => Option<U>): Option<U | T>;
    and<U>(other: Option<U>): Option<U>;
    or<U>(other: Option<U>): Option<T | U>;
    xor<U>(other: Option<U>): Option<T | U>;
    contains(value: T): boolean;
    filter(predicate: (value: T) => boolean): Option<T>;
    map<R>(mapper: (value: T) => R): Option<R>;
    match<R>(onSome: (value: T) => R, onNone: () => R): R;
    zip<U>(other: Option<U>): Option<[T, U]>;
    zipWith<U, R>(other: Option<U>, mapper: (a: T, b: U) => R): Option<R>;
    flat<U>(this: Option<Option<U>>): Option<U>;
}

export interface Some<T> extends OptionInstance<T> {
    readonly [GUARD]: OptionKind.Some;
}

export interface None extends OptionInstance<never> {
    readonly [GUARD]: OptionKind.None;
}

export type Option<T> = Some<T> | None;
