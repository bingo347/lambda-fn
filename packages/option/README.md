# @lambda-fn/option

Option type for represents an optional value
\
every Option is either Some and contains a value, or None, and does not \
[inspired by std::option::Option from Rust](https://doc.rust-lang.org/std/option/enum.Option.html)

## Install

```bash
npm install --save @lambda-fn/option
# or
yarn add @lambda-fn/option
```

## Exports

```typescript
type FromNullableReturnType<T> = Option<T!>; // in Some T is nothing nullable
interface OptionStatic {
    fromNullable<T>(value: T): FromNullableReturnType<T>;
    Some<T>(value: T): Some<T>;
    None: None;
    isOption(maybeOption: unknown): maybeOption is Option<unknown>;
    isOptionWith<T>(guard: import('@lambda-fn/type-guards').TypeGuard<T>, maybeOption: unknown): maybeOption is Option<T>;
    isSome(maybeSome: unknown): maybeSome is Some<unknown>;
    isSomeWith<T>(guard: import('@lambda-fn/type-guards').TypeGuard<T>, maybeSome: unknown): maybeSome is Some<T>;
    isNone(maybeNone: unknown): maybeNone is None;
}
interface OptionInstance<T> {
    expect(message: string | Error): T;
    unwrap(): T;
    unwrapOr<U>(defaultValue: U): T | U;
    unwrapOrElse<U>(lazy: () => U): T | U;
    clone(): Option<T>;
    andThen<U>(f: (value: T) => Option<U>): Option<U>;
    orElse<U>(f: () => Option<U>): Option<T | U>;
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
    apply<U, R>(this: Option<(value: U) => R>, target: Option<U>): Option<R>;
}
interface Some<T> extends OptionInstance<T> { /* fields omitted */ }
interface None<T = never> extends OptionInstance<T> { /* fields omitted */ }
type Option<T> = Some<T> | None;

const Some: <T>(value: T) => Some<T>;
const None: None;
const Option: OptionStatic;

function fromNullable<T>(value: T): FromNullableReturnType<T>;
function isOption(maybeOption: unknown): maybeOption is Option<unknown>;
function isOptionWith<T>(guard: import('@lambda-fn/type-guards').TypeGuard<T>): (maybeOption: unknown) => maybeOption is Option<T>;
function isSome(maybeSome: unknown): maybeSome is Some<unknown>;
function isSomeWith<T>(guard: import('@lambda-fn/type-guards').TypeGuard<T>): (maybeSome: unknown) => maybeSome is Some<T>;
function isNone(maybeNone: unknown): maybeNone is None;
function assertSome<T>(option: Option<T>, message?: string): asserts option is Some<T>;
function assertNone(option: Option<any>, message?: string): asserts option is None;
function expect<T>(option: Option<T>, message: string): T;
function unwrap<T>(option: Option<T>): T;
function unwrapOr<U>(defaultValue: U): <T>(option: Option<T>) => T | U;
function unwrapOrElse<U>(lazy: () => U): <T>(option: Option<T>) => T | U;
function contains<T>(value: T): (option: Option<T>) => boolean;
function match<T, R>(onSome: (value: T) => R, onNone: () => R): (option: Option<T>) => R;
function clone<T>(option: Option<T>): Option<T>;
function andThen<T, R>(f: (value: T) => Option<R>): (option: Option<T>) => Option<R>;
function orElse<U>(f: () => Option<U>): <T>(option: Option<T>) => Option<T | U>;
function xor<T, U>(left: Option<T>, right: Option<U>): Option<T | U>;
function filter<T>(predicate: (value: T) => boolean): (option: Option<T>) => Option<T>;
function map<T, R>(mapper: (value: T) => R): (option: Option<T>) => Option<R>;
function flat<T>(option: Option<Option<T>>): Option<T>;
```

## Example

```typescript
import Option from '@lambda-fn/option';

Option.fromNullable(null); // None
Option.fromNullable(undefined); // None
Option.fromNullable(0); // Some( 0 )

Option.fromNullable(0).contains(0); // true
Option.fromNullable(1).contains(2); // false
Option.fromNullable(null).contains(null); // false

Option.None.unwrap(); // throw TypeError
Option.Some(1).unwrap(); // 1
Option.Some(1).expect('Must be Some<number>'); // 1 - the same as unwrap, but with custom error message
```

Or in FP style:

```typescript
import {Some, None, fromNullable, contains, unwrap, expect} from '@lambda-fn/option';

fromNullable(null); // None
fromNullable(undefined); // None
fromNullable(0); // Some( 0 )

contains(fromNullable(0), 0); // true
contains(fromNullable(1), 2); // false
contains(fromNullable(null), null); // false

unwrap(None); // throw TypeError
unwrap(Some(1)); // 1
expect(Some(1), 'Must be Some<number>'); // 1 - the same as unwrap, but with custom error message
```

Make your localStorage safe:

```typescript
import {fromNullable} from '@lambda-fn/option';

const sumStorageParts = (...keys: [string, string, string]) => (keys
    .map(key => fromNullable(localStorage.getItem(key))
        .map(parseFloat)
        .filter(value => !isNaN(value) && value < 100)
    )
    .reduce((sum, opt) => sum.zipWith(opt, (a, b) => a + b))
    .unwrapOr(0)
);

/* In storage:
part1: 10
part2: 25
part3: 150
part4: 50
part5: something string
*/
sumStorageParts('part1', 'part2', 'part3'); // 0 - because part3 is not less 100
sumStorageParts('part1', 'part2', 'part4'); // 85 - because 10 + 25 + 50 = 85
sumStorageParts('part2', 'part4', 'part5'); // 0 - because part5 is parsed to NaN
sumStorageParts('part2', 'part4', 'part6'); // 0 - because part6 is null
```

## License

MIT
