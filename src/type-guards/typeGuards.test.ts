import * as tg from './typeGuards';

const trueGuard = (v: unknown): v is true => !!v;
const falseGuard = (v: unknown): v is true => !v;

test('isArray', () => {
    expect(tg.isArray([])).toEqual(true);
    expect(tg.isArray({length: 0})).toEqual(false);
});

test('isArrayBuffer', () => {
    expect(tg.isArrayBuffer(new ArrayBuffer(0))).toEqual(true);
    expect(tg.isArrayBuffer(new Int8Array())).toEqual(false);
});

test('isArrayWith', () => {
    expect(tg.isArrayWith(trueGuard, [true])).toEqual(true);
    expect(tg.isArrayWith(falseGuard, [true])).toEqual(false);
});

test('isBigInt', () => {
    expect(tg.isBigInt(BigInt(1))).toEqual(true);
    expect(tg.isBigInt(1)).toEqual(false);
});

test('isBigInt64Array', () => {
    expect(tg.isBigInt64Array(new BigInt64Array())).toEqual(true);
    expect(tg.isBigInt64Array([])).toEqual(false);
});

test('isBigUint64Array', () => {
    expect(tg.isBigUint64Array(new BigUint64Array())).toEqual(true);
    expect(tg.isBigUint64Array([])).toEqual(false);
});

test('isBoolean', () => {
    expect(tg.isBoolean(true)).toEqual(true);
    expect(tg.isBoolean(1)).toEqual(false);
});

test('isDataView', () => {
    const buffer = new ArrayBuffer(0);
    expect(tg.isDataView(new DataView(buffer))).toEqual(true);
    expect(tg.isDataView({
        buffer,
        byteLength: buffer.byteLength,
        byteOffset: 0
    })).toEqual(false);
});

test('isDate', () => {
    expect(tg.isDate(new Date())).toEqual(true);
    expect(tg.isDate({})).toEqual(false);
});

test('isError', () => {
    expect(tg.isError(new Error())).toEqual(true);
    expect(tg.isError({message: ''})).toEqual(false);
});

test('isFloat32Array', () => {
    expect(tg.isFloat32Array(new Float32Array())).toEqual(true);
    expect(tg.isFloat32Array([])).toEqual(false);
});

test('isFloat64Array', () => {
    expect(tg.isFloat64Array(new Float64Array())).toEqual(true);
    expect(tg.isFloat64Array([])).toEqual(false);
});

test('isFunction', () => {
    expect(tg.isFunction(() => void 0)).toEqual(true);
    expect(tg.isFunction({})).toEqual(false);
});

test('isInt16Array', () => {
    expect(tg.isInt16Array(new Int16Array())).toEqual(true);
    expect(tg.isInt16Array([])).toEqual(false);
});

test('isInt32Array', () => {
    expect(tg.isInt32Array(new Int32Array())).toEqual(true);
    expect(tg.isInt32Array([])).toEqual(false);
});

test('isInt8Array', () => {
    expect(tg.isInt8Array(new Int8Array())).toEqual(true);
    expect(tg.isInt8Array([])).toEqual(false);
});

test('isIterable', () => {
    expect(tg.isIterable([])).toEqual(true);
    expect(tg.isIterable(function*() {}())).toEqual(true);
    expect(tg.isIterable({})).toEqual(false);
});

test('isIterableWith', () => {
    expect(tg.isIterableWith(trueGuard, [true])).toEqual(true);
    expect(tg.isIterableWith(falseGuard, [true])).toEqual(false);
});

test('isMap', () => {
    expect(tg.isMap(new Map())).toEqual(true);
    expect(tg.isMap({})).toEqual(false);
});

test('isMapWith', () => {
    expect(tg.isMapWith((v): v is [1, 1] => !!v, new Map([[true, true]]))).toEqual(true);
    expect(tg.isMapWith((v): v is [1, 1] => !v, new Map([[true, true]]))).toEqual(false);
});

test('isNonNullable', () => {
    expect(tg.isNonNullable(0)).toEqual(true);
    expect(tg.isNonNullable(null)).toEqual(false);
    expect(tg.isNonNullable(void 0)).toEqual(false);
});

test('isNull', () => {
    expect(tg.isNull(null)).toEqual(true);
    expect(tg.isNull(void 0)).toEqual(false);
});

test('isNumber', () => {
    expect(tg.isNumber(0)).toEqual(true);
    expect(tg.isNumber(1)).toEqual(true);
    expect(tg.isNumber(Infinity)).toEqual(true);
    expect(tg.isNumber(NaN)).toEqual(true);
    expect(tg.isNumber('1')).toEqual(false);
    expect(tg.isNumber(BigInt(1))).toEqual(false);
});

test('isObject', () => {
    expect(tg.isObject({})).toEqual(true);
    expect(tg.isObject(() => void 0)).toEqual(false);
});

test('isPromise', () => {
    expect(tg.isPromise(Promise.resolve())).toEqual(true);
    expect(tg.isPromise({then() {}})).toEqual(false);
});

test('isPromiseLike', () => {
    expect(tg.isPromiseLike(Promise.resolve())).toEqual(true);
    expect(tg.isPromiseLike({then() {}})).toEqual(true);
    expect(tg.isPromiseLike({catch() {}})).toEqual(false);
});

test('isRegExp', () => {
    expect(tg.isRegExp(/1/)).toEqual(true);
    expect(tg.isRegExp('1')).toEqual(false);
});

test('isSet', () => {
    expect(tg.isSet(new Set())).toEqual(true);
    expect(tg.isSet({})).toEqual(false);
});

test('isSetWith', () => {
    expect(tg.isSetWith(trueGuard, new Set([true]))).toEqual(true);
    expect(tg.isSetWith(falseGuard, new Set([true]))).toEqual(false);
});

test('isString', () => {
    expect(tg.isString('')).toEqual(true);
    expect(tg.isString(0)).toEqual(false);
});

test('isSymbol', () => {
    expect(tg.isSymbol(Symbol())).toEqual(true);
    expect(tg.isSymbol('')).toEqual(false);
});

test('isTypedArray', () => {
    expect(tg.isTypedArray(new Int8Array())).toEqual(true);
    expect(tg.isTypedArray(new Uint8Array())).toEqual(true);
    expect(tg.isTypedArray(new Int16Array())).toEqual(true);
    expect(tg.isTypedArray(new Uint16Array())).toEqual(true);
    expect(tg.isTypedArray(new Int32Array())).toEqual(true);
    expect(tg.isTypedArray(new Uint32Array())).toEqual(true);
    expect(tg.isTypedArray(new BigInt64Array())).toEqual(true);
    expect(tg.isTypedArray(new BigUint64Array())).toEqual(true);
    expect(tg.isTypedArray(new Float32Array())).toEqual(true);
    expect(tg.isTypedArray(new Float64Array())).toEqual(true);
    expect(tg.isTypedArray([])).toEqual(false);
});

test('isUint16Array', () => {
    expect(tg.isUint16Array(new Uint16Array())).toEqual(true);
    expect(tg.isUint16Array([])).toEqual(false);
});

test('isUint32Array', () => {
    expect(tg.isUint32Array(new Uint32Array())).toEqual(true);
    expect(tg.isUint32Array([])).toEqual(false);
});

test('isUint8Array', () => {
    expect(tg.isUint8Array(new Uint8Array())).toEqual(true);
    expect(tg.isUint8Array([])).toEqual(false);
});

test('isUndefined', () => {
    expect(tg.isUndefined(void 0)).toEqual(true);
    expect(tg.isUndefined(null)).toEqual(false);
});

test('isVoid', () => {
    expect(tg.isVoid(void 0)).toEqual(true);
    expect(tg.isVoid(null)).toEqual(false);
});

test('makeInstanceofGuard', () => {
    class TestClass {}
    const testGuard = tg.makeInstanceofGuard(TestClass);
    expect(testGuard(new TestClass())).toEqual(true);
    expect(testGuard({})).toEqual(false);
    expect(testGuard(null)).toEqual(false);
    expect(testGuard(void 0)).toEqual(false);
});