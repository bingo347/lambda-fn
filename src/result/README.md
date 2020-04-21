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
```

## Example

```typescript

```

You can combine it with [pipe](https://ramdajs.com/docs/#pipe) or [compose](https://ramdajs.com/docs/#compose) from ramda:

```typescript

```

## License

MIT
