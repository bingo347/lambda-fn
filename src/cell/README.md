# @lambda-fn/cell

Simple container for store mutable value [inspired by std::cell::Cell from Rust](https://doc.rust-lang.org/std/cell/struct.Cell.html)

## Install

```bash
npm install --save @lambda-fn/cell
# or
yarn add @lambda-fn/cell
```

## Exports

```typescript
type Cell<T> = { /* fields omitted */ };
function makeCell<T>(initialValue: T): Cell<T>;
function isCell(maybeCell: unknown): maybeCell is Cell<unknown>;
function isCellWith<T>(guard: (v: unknown) => v is T): (maybeCell: unknown) => maybeCell is Cell<T>;
function get<T>(cell: Cell<T>): T;
function set<T>(cell: Cell<T>, value: T): void;
function update<T>(cell: Cell<T>, updater: (value: T) => T): void;
function clone<T>(cell: Cell<T>): Cell<T>;
function map<T, U>(mapper: (value: T) => U): (cell: Cell<T>) => Cell<U>;
function fold<T, U>(fld: (value: T) => U): (cell: Cell<T>) => U;
```

## Example

```typescript
import {makeCell, update, fold} from '@lambda-fn/cell';

const counter = makeCell(0);
const foldToString = fold((v: number) => `Result: ${v}`);
setInterval(() => {
    update(counter, v => v + 1);
}, 100);
setTimeout(() => {
    console.log(foldToString(counter));
}, 3000);
```

## License

MIT
