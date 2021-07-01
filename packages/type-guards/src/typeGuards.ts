import {getSymbolFieldValue} from './_util';

export type TypeGuard<T extends A, A = unknown> = (v: A) => v is T;
// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type CorrectNonNullable<T> = Exclude<T, null | undefined | void>;

type TypesMap = {
    'undefined': undefined;
    'boolean': boolean;
    'string': string;
    'number': number;
    'bigint': bigint;
    'symbol': symbol;
    'object': Record<string | symbol | number, unknown>;
    'function'(...args: unknown[]): unknown;
};
type AnyConstructor = new (...args: any[]) => unknown;
type TypedArray
    = Int8Array | Uint8Array
    | Int16Array | Uint16Array
    | Int32Array | Uint32Array
    | BigInt64Array | BigUint64Array
    | Float32Array | Float64Array;

const makeTypeofGuard = <T extends keyof TypesMap>(type: T) =>
    (
        (v: unknown): v is TypesMap[T] =>
            // eslint-disable-next-line valid-typeof
            typeof v === type
    );
export const makeInstanceofGuard = <C extends AnyConstructor>(constructor: C) =>
    (
        (v: unknown): v is InstanceType<C> =>
            v instanceof constructor
    );
const everyGuard = <
    V extends ArrayLike<unknown> | Iterable<unknown>,
    G extends TypeGuard<unknown>,
>(v: V, guard: G) =>
    Array.from(v).every(guard);

export const isFunction = makeTypeofGuard('function');
export const isObject = (isObjectInternal =>
    (
        (v: unknown) =>
            !isNull(v) && isObjectInternal(v)
    ))(makeTypeofGuard('object')) as TypeGuard<TypesMap['object']>;
export const isSymbol = makeTypeofGuard('symbol');
export const isString = makeTypeofGuard('string');
export const isNumber = makeTypeofGuard('number');
export const isBigInt = makeTypeofGuard('bigint');
export const isBoolean = makeTypeofGuard('boolean');
export const isUndefined = makeTypeofGuard('undefined');
export const isVoid = isUndefined as TypeGuard<void>;
export const isNull = (v: unknown): v is null =>
    v === null;
export const isRegExp = makeInstanceofGuard(RegExp);
export const isPromise = makeInstanceofGuard(Promise);
export const isDate = makeInstanceofGuard(Date);
export const isError = makeInstanceofGuard(Error);
export const isSet = makeInstanceofGuard(Set);
export const isMap = makeInstanceofGuard(Map);
export const isArrayBuffer = makeInstanceofGuard(ArrayBuffer);
export const isDataView = makeInstanceofGuard(DataView);
export const isInt8Array = makeInstanceofGuard(Int8Array);
export const isUint8Array = makeInstanceofGuard(Uint8Array);
export const isInt16Array = makeInstanceofGuard(Int16Array);
export const isUint16Array = makeInstanceofGuard(Uint16Array);
export const isInt32Array = makeInstanceofGuard(Int32Array);
export const isUint32Array = makeInstanceofGuard(Uint32Array);
export const isBigInt64Array = makeInstanceofGuard(BigInt64Array);
export const isBigUint64Array = makeInstanceofGuard(BigUint64Array);
export const isFloat32Array = makeInstanceofGuard(Float32Array);
export const isFloat64Array = makeInstanceofGuard(Float64Array);
// eslint-disable-next-line complexity
export const isTypedArray = (v: unknown): v is TypedArray =>
    (
        isInt8Array(v) || isUint8Array(v) || isInt16Array(v) || isUint16Array(v) ||
    isInt32Array(v) || isUint32Array(v) || isBigInt64Array(v) || isBigUint64Array(v) ||
    isFloat32Array(v) || isFloat64Array(v)
    );
export const isPromiseLike = (v: unknown): v is PromiseLike<unknown> =>
    isObject(v) && isFunction(v.then);
export const isArray = (v: unknown): v is unknown[] =>
    Array.isArray(v);
export const isArrayWith = <T>(guard: TypeGuard<T>, v: unknown): v is T[] =>
    isArray(v) && everyGuard(v, guard);
export const isIterable = (v: unknown): v is Iterable<unknown> =>
    isObject(v) && isFunction(getSymbolFieldValue(v, Symbol.iterator));
export const isIterableWith = <T>(guard: TypeGuard<T>, v: unknown): v is Iterable<T> =>
    isIterable(v) && everyGuard(v, guard);
export const isSetWith = <T>(guard: TypeGuard<T>, v: unknown): v is Set<T> =>
    isSet(v) && everyGuard(v, guard);
export const isMapWith = <K, V>(guard: TypeGuard<[K, V]>, v: unknown): v is Map<K, V> =>
    isMap(v) && everyGuard(v, guard);
export const isNonNullable = <T>(v: T): v is CorrectNonNullable<T> =>
    !(isNull(v) || isUndefined(v));
export const isConstructor = (v: unknown): v is {
    (...args: unknown[]): unknown;
    new (...args: unknown[]): unknown;
} =>
    isFunction(v) && (isFunction(v.prototype) || isObject(v.prototype)) && v === v.prototype.constructor;
