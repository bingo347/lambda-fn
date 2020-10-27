# @lambda-fn/result

Result is a type that represents either success (Ok) or failure (Err)
\
[inspired by std::result::Result from Rust](https://doc.rust-lang.org/std/result/enum.Result.html)

## Install

```bash
npm install --save @lambda-fn/result
# or
yarn add @lambda-fn/result
```

## Exports

```typescript
interface ResultStatic {
    Ok<T>(value: T): Ok<T>;
    Err<E>(error: E): Err<E>;
    tryCatch<T, E>(f: () => T, onError?: (value: unknown) => E): Result<T, E>;
    isOk(maybeOk: unknown): maybeOk is Ok<unknown>;
    isErr(maybeErr: unknown): maybeErr is Err<unknown>;
    isResult(maybeResult: unknown): maybeResult is Result<unknown, unknown>;
    isOkWith<T>(guard: import('@lambda-fn/type-guards').TypeGuard<T>, maybeOk: unknown): maybeOk is Ok<T>;
    isErrWith<E>(guard: import('@lambda-fn/type-guards').TypeGuard<E>, maybeErr: unknown): maybeErr is Err<E>;
    isResultWith<T, E>(
        guardOk: import('@lambda-fn/type-guards').TypeGuard<T>,
        guardErr: import('@lambda-fn/type-guards').TypeGuard<E>,
        maybeResult: unknown
    ): maybeResult is Result<T, E>;
}
interface ResultInstance<T, E> {
    expect(message: string | Error): T;
    expectErr(message: string | Error): E;
    unwrap(): T;
    unwrapErr(): E;
    unwrapOr<U>(defaultValue: U): T | U;
    unwrapOrElse<U>(lazy: () => U): T | U;
    clone(): Result<T, E>;
    andThen<U, O>(f: (value: T) => Result<U, O>): Result<U, E | O>;
    orElse<U, O>(f: (value: E) => Result<U, O>): Result<T | U, O>;
    and<U>(other: Result<U, E>): Result<U, E>;
    or<O>(other: Result<T, O>): Result<T, O>;
    contains(value: T): boolean;
    containsErr(error: E): boolean;
    map<R>(mapper: (value: T) => R): Result<R, E>;
    mapErr<R>(mapper: (value: E) => R): Result<T, R>;
    match<R>(onOk: (value: T) => R, onErr: (value: E) => R): R;
    flat<U, O>(this: Result<Result<U, O>, E>): Result<U, E | O>;
    apply<U, R, O>(this: Result<(value: U) => R, E>, target: Result<U, O>): Result<R, E | O>;
}
interface Ok<T, E = never> extends ResultInstance<T, E> { /* fields omitted */ }
interface Err<E, T = never> extends ResultInstance<T, E> { /* fields omitted */ }
type Result<T, E> = Ok<T> | Err<E>;

const Ok: <T>(value: T) => Ok<T>;
const Err: <E>(error: E) => Err<E>;
const Result: ResultStatic;

function tryCatch<T, E>(f: () => T, onError?: (e: unknown) => E): Result<T, E>;
function assertOk<T>(result: Result<T, any>, message?: string): asserts result is Ok<T>;
function assertErr<T>(result: Result<T, any>, message?: string): asserts result is Err<T>;
function isOk(maybeOk: unknown): maybeOk is Ok<unknown>;
function isErr(maybeErr: unknown): maybeErr is Err<unknown>;
function isResult(maybeResult: unknown): maybeResult is Result<unknown, unknown>;
function isOkWith<T>(guard: (v: unknown) => v is T): (maybeOk: unknown) => maybeOk is Ok<T>;
function isErrWith<E>(guard: (e: unknown) => e is E): (maybeErr: unknown) => maybeErr is Err<E>;
function isResultWith<T, E>(guardOk: (v: unknown) => v is T, guardErr: (e: unknown) => e is E): (maybeResult: unknown) => maybeResult is Result<T, E>;
function expect<T>(result: Result<T, any>, msg: string): T;
function unwrap<T, E>(result: Result<T, E>): T;
function unwrapOr<T>(defaultValue: T): <E>(result: Result<T, E>) => T;
function unwrapOrElse<T>(lazy: () => T): <E>(result: Result<T, E>) => T;
function andThen<T, E, R>(f: (value: T) => Result<R, E>): (result: Result<T, E>) => Result<R, E>;
function orElse<T, E, O>(f: (error: E) => Result<T, O>): (result: Result<T, E>) => Result<T, O>;
function contains<T>(value: T): (result: Result<T, any>) => boolean;
function containsErr<E>(error: E): (result: Result<any, E>) => boolean;
function map<T, R>(mapper: (value: T) => R): <E>(result: Result<T, E>) => Result<R, E>;
function mapErr<E, O>(mapper: (error: E) => O): <T>(result: Result<T, E>) => Result<T, O>;
function flat<T, E>(result: Result<Result<T, E>, E>): Result<T, E>;
function match<T, E, R>(onOk: (value: T) => R, onErr: (error: E) => R): (result: Result<T, E>) => R;
function clone<T, E>(result: Result<T, E>): Result<T, E>;
```

## Example

```typescript
import {Ok, Err, tryCatch, unwrap, expect} from '@lambda-fn/result';

tryCatch(() => {
    throw 'oops';
}); // Err( Error: oops )
tryCatch(() => {
    throw new TypeError('oops');
}); // Err( TypeError: oops )
tryCatch(() => {
    return 1;
}); // Ok( 1 )

Err(new Error('oops')).unwrap(); // throw Error: oops
Ok(1).unwrap(); // 1
Ok(1).expect('It cannot be Err never'); // 1 - the same as unwrap, but with custom error message

const parseJSON = (json: string) => tryCatch(() => JSON.parse(json))
    .andThen(data => (Array.isArray(data) && data.length > 0
        ? Ok(data[0])
        : Err(new Error('Data must be non empty array'))
    ));
parseJSON('{'); // Err( SyntaxError: Unexpected end of JSON input )
parseJSON('[1]'); // Ok( 1 )
parseJSON('{}'); // Err( Error: Data must be non empty array )
parseJSON('[]'); // Err( Error: Data must be non empty array )
```

## License

MIT
