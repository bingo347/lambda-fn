# @lambda-fn/type-guards

Type guards for basic javascript types

## Install

```bash
npm install --save @lambda-fn/type-guards
# or
yarn add @lambda-fn/type-guards
```

## Exports

```typescript
type TypeGuard<T extends A, A = unknown> = (v: A) => v is T;

// for create type guards from your classes
function makeInstanceofGuard<C extends new (...args: any) => unknown>(constructor: C): (v: unknown) => v is InstanceType<C>;

function isFunction(v: unknown): v is (...args: any[]) => unknown;
function isConstructor(v: unknown): v is new (...args: unknown[]) => unknown;
function isObject(v: unknown): v is Record<PropertyKey, unknown>;
function isSymbol(v: unknown): v is symbol;
function isString(v: unknown): v is string;
function isNumber(v: unknown): v is number;
function isBigInt(v: unknown): v is bigint;
function isBoolean(v: unknown): v is boolean;
function isUndefined(v: unknown): v is undefined;
function isVoid(v: unknown): v is void;
function isNull(v: unknown): v is null;
function isRegExp(v: unknown): v is RegExp;
function isPromise(v: unknown): v is Promise<unknown>;
function isDate(v: unknown): v is Date;
function isError(v: unknown): v is Error;
function isSet(v: unknown): v is Set<unknown>;
function isMap(v: unknown): v is Map<unknown, unknown>;
function isArrayBuffer(v: unknown): v is ArrayBuffer;
function isDataView(v: unknown): v is DataView;
function isInt8Array(v: unknown): v is Int8Array;
function isUint8Array(v: unknown): v is Uint8Array;
function isInt16Array(v: unknown): v is Int16Array;
function isUint16Array(v: unknown): v is Uint16Array;
function isInt32Array(v: unknown): v is Int32Array;
function isUint32Array(v: unknown): v is Uint32Array;
function isBigInt64Array(v: unknown): v is BigInt64Array;
function isBigUint64Array(v: unknown): v is BigUint64Array;
function isFloat32Array(v: unknown): v is Float32Array;
function isFloat64Array(v: unknown): v is Float64Array;
function isTypedArray(v: unknown): v is Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | BigInt64Array | BigUint64Array | Float32Array | Float64Array;
function isPromiseLike(v: unknown): v is PromiseLike<unknown>;
function isArray(v: unknown): v is unknown[];
function isArrayWith<T>(guard: TypeGuard<T>, v: unknown): v is T[];
function isIterable(v: unknown): v is Iterable<unknown>;
function isIterableWith<T>(guard: TypeGuard<T>, v: unknown): v is Iterable<T>;
function isSetWith<T>(guard: TypeGuard<T>, v: unknown): v is Set<T>;
function isMapWith<K, V>(guard: TypeGuard<[K, V]>, v: unknown): v is Map<K, V>;
function isNullable(v: unknown): v is null | undefined;
function isNonNullable<T>(v: T): v is NonNullable<T>;
function isPropertyKey(v: unknown): v is PropertyKey;
function isObjectWithKey<K extends PropertyKey, T>(key: K, guard?: TypeGuard<T, unknown>): (v: unknown) => v is Record<K, T>;
function isObjectLike(v: unknown): v is Record<PropertyKey, unknown> | (...args: any[]) => unknown;
function isPrimitive(v: unknown): v is string | number | bigint | boolean | symbol | null | undefined;
function isEqualTo<V extends string | number | bigint | boolean | symbol | null | undefined>(value: V): TypeGuard<V, unknown>;
function isEqualTo<V extends string | number | bigint | boolean | symbol | null | undefined>(value: V, v: unknown): v is V;
```

## License

MIT
