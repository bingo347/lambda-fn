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

/** Guard for ArrayBuffer type */
export const isArrayBuffer = /*@__PURE__*/makeInstanceofGuard(ArrayBuffer);

/** Guard for DataView type */
export const isDataView = /*@__PURE__*/makeInstanceofGuard(DataView);

/** Guard for Int8Array type */
export const isInt8Array = /*@__PURE__*/makeInstanceofGuard(Int8Array);

/** Guard for Uint8Array type */
export const isUint8Array = /*@__PURE__*/makeInstanceofGuard(Uint8Array);

/** Guard for Int16Array type */
export const isInt16Array = /*@__PURE__*/makeInstanceofGuard(Int16Array);

/** Guard for Uint16Array type */
export const isUint16Array = /*@__PURE__*/makeInstanceofGuard(Uint16Array);

/** Guard for Int32Array type */
export const isInt32Array = /*@__PURE__*/makeInstanceofGuard(Int32Array);

/** Guard for Uint32Array type */
export const isUint32Array = /*@__PURE__*/makeInstanceofGuard(Uint32Array);

/** Guard for BigInt64Array type */
export const isBigInt64Array = /*@__PURE__*/makeInstanceofGuard(BigInt64Array);

/** Guard for BigUint64Array type */
export const isBigUint64Array = /*@__PURE__*/makeInstanceofGuard(BigUint64Array);

/** Guard for Float32Array type */
export const isFloat32Array = /*@__PURE__*/makeInstanceofGuard(Float32Array);

/** Guard for Float64Array type */
export const isFloat64Array = /*@__PURE__*/makeInstanceofGuard(Float64Array);

/** Guard for TypedArray type */
// eslint-disable-next-line complexity
export const isTypedArray = (v: unknown): v is TypedArray =>
    isInt8Array(v) || isUint8Array(v) || isInt16Array(v) || isUint16Array(v) ||
    isInt32Array(v) || isUint32Array(v) || isBigInt64Array(v) || isBigUint64Array(v) ||
    isFloat32Array(v) || isFloat64Array(v);

