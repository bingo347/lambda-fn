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
type Some<T> = { /* fields omitted */ };
type None = { /* fields omitted */ };
type Option<T> = Some<T> | None;
const none: None;
function some<T>(value: T): Some<T>;
function fromNullable<T>(value: T): Option<NonNullable<T>>;
function isSome(maybeSome: unknown): maybeSome is Some<unknown>;
function isNone(maybeNone: unknown): maybeNone is None;
function isOption(maybeOption: unknown): maybeOption is Option<unknown>;
function isSomeWith<T>(guard: (v: unknown) => v is T): (maybeSome: unknown) => maybeSome is Some<T>;
function isOptionWith<T>(guard: (v: unknown) => v is T): (maybeOption: unknown) => maybeOption is Option<T>;
function assert<T>(option: Option<T>, msg?: string): asserts option is Some<T>;
function expect<T>(option: Option<T>, msg: string): T;
function unwrap<T>(option: Option<T>): T;
function unwrapOr<T>(defaultValue: T): (option: Option<T>) => T;
function unwrapOrElse<T>(lazy: () => T): (option: Option<T>) => T;
function and<TS extends any[]>(...options: Option<TS[number]>[]): Option<TS>; // simplified, it overloaded for better type checking
function andThen<T, R>(f: (value: T) => Option<R>): (option: Option<T>) => Option<R>;
function or<TS extends any[]>(...options: Option<TS[number]>[]): Option<TS[number]>; // simplified, it overloaded for better type checking
function orElse<U>(f: () => Option<U>): <T>(option: Option<T>) => Option<U | T>;
function xor<T, U>(left: Option<T>, right: Option<U>): Option<T | U>;
function contains<T>(value: T): (option: Option<T>) => boolean;
function filter<T>(predicate: (value: T) => boolean): (option: Option<T>) => Option<T>;
function map<T, R>(mapper: (value: T) => R): (option: Option<T>) => Option<R>;
function flat<T>(option: Option<Option<T>>): Option<T>;
function match<T, R>(onSome: (value: T) => R, onNone: () => R): (option: Option<T>) => R;
function clone<T>(option: Option<T>): Option<T>;
```

## Example

```typescript
import {some, none, fromNullable, contains, unwrap, expect} from '@lambda-fn/option';

fromNullable(null); // None
fromNullable(undefined); // None
fromNullable(0); // Some( 0 )

contains(fromNullable(0), 0); // true
contains(fromNullable(1), 2); // false
contains(fromNullable(null), null); // false

unwrap(none); // throw TypeError
unwrap(some(1)); // 1
expect(some(1), 'Must be Some<number>'); // 1 - the same as unwrap, but with custom error message
```

You can combine it with [pipe](https://ramdajs.com/docs/#pipe) or [compose](https://ramdajs.com/docs/#compose) from ramda:

```typescript
import {some, none, fromNullable, unwrapOr, andThen, map, filter} from '@lambda-fn/option';
import {pipe} from 'ramda';

const getStorage = (key: string) => fromNullable(localStorage.getItem(key));
const parseStorageIfLess100 = pipe(
    getStorage,
    andThen((value: string) => {
        const parsedValue = parseFloat(value);
        return isNaN(parsedValue) ? none : some(parsedValue);
    }),
    filter((value: number) => value < 100)
);
const sumParts = pipe(
    map(([a, b, c]: [number, number, number]) => a + b + c),
    unwrapOr(0)
);
const sumStorageParts = (...keys: [string, string, string]) => sumParts(keys.map(parseStorageIfLess100));

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
