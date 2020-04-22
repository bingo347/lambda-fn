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
type Ok<T> = { /* fields omitted */ };
type Err<E> = { /* fields omitted */ };
type Result<T, E> = Ok<T> | Err<E>;
function ok<T>(value: T): Ok<T>;
function err<E>(error: E): Err<E>;
function tryCatch<T, E>(f: () => T, onError?: (e: unknown) => E): Result<T, E>;
function isOk(maybeOk: unknown): maybeOk is Ok<unknown>;
function isErr(maybeErr: unknown): maybeErr is Err<unknown>;
function isResult(maybeResult: unknown): maybeResult is Result<unknown, unknown>;
function isOkWith<T>(guard: (v: unknown) => v is T): (maybeOk: unknown) => maybeOk is Ok<T>;
function isErrWith<E>(guard: (e: unknown) => e is E): (maybeErr: unknown) => maybeErr is Err<E>;
function isResultWith<T, E>(guardOk: (v: unknown) => v is T, guardErr: (e: unknown) => e is E): (maybeResult: unknown) => maybeResult is Result<T, E>;
function assert<T>(result: Result<T, any>): asserts result is Ok<T>;
function expect<T>(result: Result<T, any>, msg: string): T;
function unwrap<T, E>(result: Result<T, E>): T;
function unwrapOr<T>(defaultValue: T): <E>(result: Result<T, E>) => T;
function unwrapOrElse<T>(lazy: () => T): <E>(result: Result<T, E>) => T;
function and<TS extends any[], E>(...results: [Result<TS[number], E>, Result<TS[number], E>, ...Result<TS[number], E>[]]): Result<TS, E>; // simplified, it overloaded for better type checking
function andThen<T, E, R>(f: (value: T) => Result<R, E>): (result: Result<T, E>) => Result<R, E>;
function or<TS extends any[], E>(...results: [Result<TS[number], E>, Result<TS[number], E>, ...Result<TS[number], E>[]]): Result<TS[number], E>; // simplified, it overloaded for better type checking
function orElse<T, E, O>(f: (error: E) => Result<T, O>): (result: Result<T, E>) => Result<T, O>;
function contains<T>(value: T): (result: Result<T, any>) => boolean;
function containsErr<E>(error: E): (result: Result<any, E>) => boolean;
function map<T, R>(mapper: (value: T) => R): <E>(result: Result<T, E>) => Result<R, E>;
function mapErr<E, O>(mapper: (error: E) => O): <T>(result: Result<T, E>) => Result<T, O>;
function mapOr<T, R>(defaultValue: R, mapper: (value: T) => R): <E>(result: Result<T, E>) => R;
function flat<T, E>(result: Result<Result<T, E>, E>): Result<T, E>;
function match<T, E, R>(onOk: (value: T) => R, onErr: (error: E) => R): (result: Result<T, E>) => R;
function clone<T, E>(result: Result<T, E>): Result<T, E>;
```

## Example

```typescript
import {ok, err, tryCatch, unwrap, expect} from '@lambda-fn/result';

tryCatch(() => {
    throw 'oops';
}); // Err( Error: oops )
tryCatch(() => {
    throw new TypeError('oops');
}); // Err( TypeError: oops )
tryCatch(() => {
    return 1;
}); // Ok( 1 )

unwrap(err(new Error('oops'))); // throw Error: oops
unwrap(ok(1)); // 1
expect(ok(1), 'It cannot be Err never'); // 1 - the same as unwrap, but with custom error message
```

You can combine it with [pipe](https://ramdajs.com/docs/#pipe) or [compose](https://ramdajs.com/docs/#compose) from ramda:

```typescript
import {ok, err, tryCatch, andThen, unwrapOrElse} from '@lambda-fn/result';
import {pipe} from 'ramda';

const parseJSON = (json: string) => tryCatch(() => JSON.parse(json));
const parseArrayFromJSONAndGetFirst = pipe(
    parseJSON,
    andThen((data: unknown) => (Array.isArray(data) && data.length > 0
        ? ok(data[0])
        : err(new Error('Data must be non empty array'))
    ))
);
const parseFromJSONOrGetDefaultObject = pipe(
    parseJSON,
    unwrapOrElse(() => ({default: true}))
);

parseJSON('{}'); // Ok( {} )
parseJSON('{'); // Err( SyntaxError: Unexpected end of JSON input )
parseArrayFromJSONAndGetFirst('[1]'); // Ok( 1 )
parseArrayFromJSONAndGetFirst('[]'); // Err( Error: Data must be non empty array )
parseArrayFromJSONAndGetFirst('['); // Err( SyntaxError: Unexpected end of JSON input )
parseFromJSONOrGetDefaultObject('{"parsed":true}'); // { parsed: true }
parseFromJSONOrGetDefaultObject('{parsed:true}'); // { default: true } - because without " it is invalid JSON
```

## License

MIT
