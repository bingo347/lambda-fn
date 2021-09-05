import {makeInstanceofGuard} from './instanceof';

type TypedArray =
    | Int8Array
    | Uint8Array
    | Int16Array
    | Uint16Array
    | Int32Array
    | Uint32Array
    | BigInt64Array
    | BigUint64Array
    | Float32Array
    | Float64Array;

export const isArrayBuffer = /*@__PURE__*/makeInstanceofGuard(ArrayBuffer);
export const isDataView = /*@__PURE__*/makeInstanceofGuard(DataView);
export const isInt8Array = /*@__PURE__*/makeInstanceofGuard(Int8Array);
export const isUint8Array = /*@__PURE__*/makeInstanceofGuard(Uint8Array);
export const isInt16Array = /*@__PURE__*/makeInstanceofGuard(Int16Array);
export const isUint16Array = /*@__PURE__*/makeInstanceofGuard(Uint16Array);
export const isInt32Array = /*@__PURE__*/makeInstanceofGuard(Int32Array);
export const isUint32Array = /*@__PURE__*/makeInstanceofGuard(Uint32Array);
export const isBigInt64Array = /*@__PURE__*/makeInstanceofGuard(BigInt64Array);
export const isBigUint64Array = /*@__PURE__*/makeInstanceofGuard(BigUint64Array);
export const isFloat32Array = /*@__PURE__*/makeInstanceofGuard(Float32Array);
export const isFloat64Array = /*@__PURE__*/makeInstanceofGuard(Float64Array);

// eslint-disable-next-line complexity
export const isTypedArray = (v: unknown): v is TypedArray =>
    isInt8Array(v) || isUint8Array(v) || isInt16Array(v) || isUint16Array(v) ||
    isInt32Array(v) || isUint32Array(v) || isBigInt64Array(v) || isBigUint64Array(v) ||
    isFloat32Array(v) || isFloat64Array(v);

