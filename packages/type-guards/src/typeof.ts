import type {AnyConstructor, AnyFn, Primitive} from '@lambda-fn/basis';
import {guards} from '@lambda-fn/basis';
import {isNull} from './values';

/** Guard for non nullable object type */
export const isObject = (v: unknown): v is Record<PropertyKey, unknown> =>
    !isNull(v) && guards.o(v);

/** Guard for Function type */
export const isFunction: (v: unknown) => v is AnyFn<unknown> = guards.f;

/** Guard for undefined type */
export const isUndefined = guards.u;

/** Guard for boolean type */
export const isBoolean = guards.b;

/** Guard for string type */
export const isString = guards.s;

/** Guard for number type */
export const isNumber = guards.n;

/** Guard for bigint type */
export const isBigInt = guards.bi;

/** Guard for symbol type */
export const isSymbol = guards.sy;

/** Guard for PropertyKey (`string | number | symbol`) type */
export const isPropertyKey = (v: unknown): v is PropertyKey =>
    isString(v) || isNumber(v) || isSymbol(v);

/** Guard for Nullable (`null | undefined`) type */
export const isNullable = (v: unknown): v is null | undefined =>
    isNull(v) || isUndefined(v);

/** Guard for NonNullable type */
export const isNonNullable = <T>(v: T): v is NonNullable<T> =>
    !isNullable(v);

/** Guard for Primitive (`string | number | bigint | boolean | symbol | null | undefined`) type */
export const isPrimitive = (v: unknown): v is Primitive =>
    isNullable(v) || isPropertyKey(v) || isBoolean(v) || isBigInt(v);

/** Guard for type represents object or function */
export const isObjectLike = (v: unknown): v is AnyFn<unknown> | Record<PropertyKey, unknown> =>
    isObject(v) || isFunction(v);

/** Guard for Constructor type (function that possible calls with `new` operator) */
export const isConstructor = (v: unknown): v is AnyConstructor<unknown> & AnyFn<unknown> =>
    isFunction(v) && isObjectLike(v.prototype) && v === v.prototype.constructor;
