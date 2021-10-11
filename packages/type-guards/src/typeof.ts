import type {AnyConstructor, AnyFn, Primitive} from '@lambda-fn/basis';
import {guards} from '@lambda-fn/basis';
import {isNull} from './values';

export const isObject = (v: unknown): v is Record<PropertyKey, unknown> =>
    !isNull(v) && guards.o(v);
export const isFunction: (v: unknown) => v is AnyFn<unknown> = guards.f;
export const isUndefined = guards.u;
export const isBoolean = guards.b;
export const isString = guards.s;
export const isNumber = guards.n;
export const isBigInt = guards.bi;
export const isSymbol = guards.sy;

export const isPropertyKey = (v: unknown): v is PropertyKey =>
    isString(v) || isNumber(v) || isSymbol(v);

export const isNullable = (v: unknown): v is null | undefined =>
    isNull(v) || isUndefined(v);

export const isNonNullable = <T>(v: T): v is NonNullable<T> =>
    !isNullable(v);

export const isPrimitive = (v: unknown): v is Primitive =>
    isNullable(v) || isPropertyKey(v) || isBoolean(v) || isBigInt(v);

export const isObjectLike = (v: unknown): v is AnyFn<unknown> | Record<PropertyKey, unknown> =>
    isObject(v) || isFunction(v);

export const isConstructor = (v: unknown): v is AnyConstructor<unknown> & AnyFn<unknown> =>
    isFunction(v) && isObjectLike(v.prototype) && v === v.prototype.constructor;
