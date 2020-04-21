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

```

## Example

```typescript

```

You can combine it with [pipe](https://ramdajs.com/docs/#pipe) or [compose](https://ramdajs.com/docs/#compose) from ramda:

```typescript

```

## License

MIT
