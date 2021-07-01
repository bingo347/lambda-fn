import * as tg from './typeGuards';

const trueGuard = (v: unknown): v is true =>
    !!v;
const falseGuard = (v: unknown): v is true =>
    !v;

test('isArray', () => {
    expect(tg.isArray([])).toBe(true);
    expect(tg.isArray({length: 0})).toBe(false);
});

test('isArrayBuffer', () => {
    expect(tg.isArrayBuffer(new ArrayBuffer(0))).toBe(true);
    expect(tg.isArrayBuffer(new Int8Array())).toBe(false);
});

test('isArrayWith', () => {
    expect(tg.isArrayWith(trueGuard, [true])).toBe(true);
    expect(tg.isArrayWith(falseGuard, [true])).toBe(false);
});

test('isBigInt', () => {
    expect(tg.isBigInt(BigInt(1))).toBe(true);
    expect(tg.isBigInt(1)).toBe(false);
});

test('isBigInt64Array', () => {
    expect(tg.isBigInt64Array(new BigInt64Array())).toBe(true);
    expect(tg.isBigInt64Array([])).toBe(false);
});

test('isBigUint64Array', () => {
    expect(tg.isBigUint64Array(new BigUint64Array())).toBe(true);
    expect(tg.isBigUint64Array([])).toBe(false);
});

test('isBoolean', () => {
    expect(tg.isBoolean(true)).toBe(true);
    expect(tg.isBoolean(1)).toBe(false);
});

test('isDataView', () => {
    const buffer = new ArrayBuffer(0);
    expect(tg.isDataView(new DataView(buffer))).toBe(true);
    expect(tg.isDataView({
        buffer,
        byteLength: buffer.byteLength,
        byteOffset: 0,
    })).toBe(false);
});

test('isDate', () => {
    expect(tg.isDate(new Date())).toBe(true);
    expect(tg.isDate({})).toBe(false);
});

test('isError', () => {
    expect(tg.isError(new Error())).toBe(true);
    expect(tg.isError({message: ''})).toBe(false);
});

test('isFloat32Array', () => {
    expect(tg.isFloat32Array(new Float32Array())).toBe(true);
    expect(tg.isFloat32Array([])).toBe(false);
});

test('isFloat64Array', () => {
    expect(tg.isFloat64Array(new Float64Array())).toBe(true);
    expect(tg.isFloat64Array([])).toBe(false);
});

test('isFunction', () => {
    expect(tg.isFunction(() =>
        void 0)).toBe(true);
    expect(tg.isFunction({})).toBe(false);
});

test('isInt16Array', () => {
    expect(tg.isInt16Array(new Int16Array())).toBe(true);
    expect(tg.isInt16Array([])).toBe(false);
});

test('isInt32Array', () => {
    expect(tg.isInt32Array(new Int32Array())).toBe(true);
    expect(tg.isInt32Array([])).toBe(false);
});

test('isInt8Array', () => {
    expect(tg.isInt8Array(new Int8Array())).toBe(true);
    expect(tg.isInt8Array([])).toBe(false);
});

test('isIterable', () => {
    expect(tg.isIterable([])).toBe(true);
    expect(tg.isIterable((function* () {})())).toBe(true);
    expect(tg.isIterable({})).toBe(false);
});

test('isIterableWith', () => {
    expect(tg.isIterableWith(trueGuard, [true])).toBe(true);
    expect(tg.isIterableWith(falseGuard, [true])).toBe(false);
});

test('isMap', () => {
    expect(tg.isMap(new Map())).toBe(true);
    expect(tg.isMap({})).toBe(false);
});

test('isMapWith', () => {
    expect(tg.isMapWith((v): v is [1, 1] =>
        !!v, new Map([[true, true]]))).toBe(true);
    expect(tg.isMapWith((v): v is [1, 1] =>
        !v, new Map([[true, true]]))).toBe(false);
});

test('isNonNullable', () => {
    expect(tg.isNonNullable(0)).toBe(true);
    expect(tg.isNonNullable(null)).toBe(false);
    expect(tg.isNonNullable(void 0)).toBe(false);
});

test('isNull', () => {
    expect(tg.isNull(null)).toBe(true);
    expect(tg.isNull(void 0)).toBe(false);
});

test('isNumber', () => {
    expect(tg.isNumber(0)).toBe(true);
    expect(tg.isNumber(1)).toBe(true);
    expect(tg.isNumber(Infinity)).toBe(true);
    expect(tg.isNumber(NaN)).toBe(true);
    expect(tg.isNumber('1')).toBe(false);
    expect(tg.isNumber(BigInt(1))).toBe(false);
});

test('isObject', () => {
    expect(tg.isObject({})).toBe(true);
    expect(tg.isObject(() =>
        void 0)).toBe(false);
});

test('isPromise', () => {
    expect(tg.isPromise(Promise.resolve())).toBe(true);
    expect(tg.isPromise({then() {}})).toBe(false);
});

test('isPromiseLike', () => {
    expect(tg.isPromiseLike(Promise.resolve())).toBe(true);
    expect(tg.isPromiseLike({then() {}})).toBe(true);
    expect(tg.isPromiseLike({catch() {}})).toBe(false);
});

test('isRegExp', () => {
    expect(tg.isRegExp(/1/)).toBe(true);
    expect(tg.isRegExp('1')).toBe(false);
});

test('isSet', () => {
    expect(tg.isSet(new Set())).toBe(true);
    expect(tg.isSet({})).toBe(false);
});

test('isSetWith', () => {
    expect(tg.isSetWith(trueGuard, new Set([true]))).toBe(true);
    expect(tg.isSetWith(falseGuard, new Set([true]))).toBe(false);
});

test('isString', () => {
    expect(tg.isString('')).toBe(true);
    expect(tg.isString(0)).toBe(false);
});

test('isSymbol', () => {
    expect(tg.isSymbol(Symbol())).toBe(true);
    expect(tg.isSymbol('')).toBe(false);
});

test('isTypedArray', () => {
    expect(tg.isTypedArray(new Int8Array())).toBe(true);
    expect(tg.isTypedArray(new Uint8Array())).toBe(true);
    expect(tg.isTypedArray(new Int16Array())).toBe(true);
    expect(tg.isTypedArray(new Uint16Array())).toBe(true);
    expect(tg.isTypedArray(new Int32Array())).toBe(true);
    expect(tg.isTypedArray(new Uint32Array())).toBe(true);
    expect(tg.isTypedArray(new BigInt64Array())).toBe(true);
    expect(tg.isTypedArray(new BigUint64Array())).toBe(true);
    expect(tg.isTypedArray(new Float32Array())).toBe(true);
    expect(tg.isTypedArray(new Float64Array())).toBe(true);
    expect(tg.isTypedArray([])).toBe(false);
});

test('isUint16Array', () => {
    expect(tg.isUint16Array(new Uint16Array())).toBe(true);
    expect(tg.isUint16Array([])).toBe(false);
});

test('isUint32Array', () => {
    expect(tg.isUint32Array(new Uint32Array())).toBe(true);
    expect(tg.isUint32Array([])).toBe(false);
});

test('isUint8Array', () => {
    expect(tg.isUint8Array(new Uint8Array())).toBe(true);
    expect(tg.isUint8Array([])).toBe(false);
});

test('isUndefined', () => {
    expect(tg.isUndefined(void 0)).toBe(true);
    expect(tg.isUndefined(null)).toBe(false);
});

test('isVoid', () => {
    expect(tg.isVoid(void 0)).toBe(true);
    expect(tg.isVoid(null)).toBe(false);
});

test('makeInstanceofGuard', () => {
    class TestClass {}

    const testGuard = tg.makeInstanceofGuard(TestClass);
    expect(testGuard(new TestClass())).toBe(true);
    expect(testGuard({})).toBe(false);
    expect(testGuard(null)).toBe(false);
    expect(testGuard(void 0)).toBe(false);
});

test('isConstructor', () => {
    expect(tg.isConstructor(class T {})).toBe(true);
    expect(tg.isConstructor(function T() {})).toBe(true);
    expect(tg.isConstructor(() => {})).toBe(false);
    expect(tg.isConstructor(Object)).toBe(true);
    expect(tg.isConstructor(Function)).toBe(true);
    expect(tg.isConstructor({})).toBe(false);
});
