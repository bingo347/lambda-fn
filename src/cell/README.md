# @lambda-fn/cell

Simple container for store mutable value
[inspired by std::cell::Cell from Rust](https://doc.rust-lang.org/std/cell/struct.Cell.html)

## Install

```bash
npm install --save @lambda-fn/cell
# or
yarn add @lambda-fn/cell
```

## Exports

```typescript
interface CellStatic {
    isCell(maybeCell: unknown): maybeCell is Cell<unknown>;
    isCellWith<T>(guard: (v: unknown) => v is T, maybeCell: unknown): maybeCell is Cell<T>;
}
interface CellFactory extends CellStatic {
    <T>(initialValue: T): Cell<T>;
}
interface Cell<T> {
    value: T;
    get(): T;
    set(value: T): void;
    update(updater: (value: T) => T): void;
    subscribe(subscription: (value: T) => void): () => void;
    clone(): Cell<T>;
    map<U>(mapper: (value: T) => U): Cell<U>;
    fold<U>(mapper: (value: T) => U): U;
}

// Cell also is default export
function Cell<T>(initialValue: T): Cell<T>; // implements CellFactory

function isCell(maybeCell: unknown): maybeCell is Cell<unknown>;
function isCellWith<T>(guard: (v: unknown) => v is T, maybeCell: unknown): maybeCell is Cell<T>;

function get<T>(cell: Cell<T>): T;
function set<T>(cell: Cell<T>, value: T): void;
function update<T>(cell: Cell<T>, updater: (value: T) => T): void;
function subscribe<T>(cell: Cell<T>, subscription: (value: T) => void): () => void;
function clone<T>(cell: Cell<T>): Cell<T>;
function map<T, U>(cell: Cell<T>, mapper: (value: T) => U): Cell<U>;
function map<T, U>(mapper: (value: T) => U): (cell: Cell<T>) => Cell<U>;
function fold<T, U>(cell: Cell<T>, mapper: (value: T) => U): U;
function fold<T, U>(mapper: (value: T) => U): (cell: Cell<T>) => U;
```

## Example

```typescript
import Cell from '@lambda-fn/cell';

const counter = Cell(0);
const unsubscribe = counter.subscribe(v => {
    console.log(`Result: ${v}`);
});
const interval = setInterval(() => {
    counter.value++;
}, 100);
setTimeout(() => {
    unsubscribe();
    clearInterval(interval);
    console.log(counter.fold(v => `Result: ${v}`));
}, 3000);

```

Or in FP style:

```typescript
import {Cell, update, fold} from '@lambda-fn/cell';

const counter = Cell(0);
const foldToString = fold((v: number) => `Result: ${v}`);
const unsubscribe = subscribe(counter, () => {
    console.log(foldToString(counter));
});
const interval = setInterval(() => {
    update(counter, v => v + 1);
}, 100);
setTimeout(() => {
    unsubscribe();
    clearInterval(interval);
    console.log(foldToString(counter));
}, 3000);
```

Cell also implements [writable store](https://svelte.dev/docs#writable) from [Svelte](https://www.npmjs.com/package/svelte):

```svelte
<script>
import Cell from '@lambda-fn/cell';

const counter = Cell(0);
</script>

<button on:click={() => $counter++}>Clicked {$counter} times</button>
```

## License

MIT
