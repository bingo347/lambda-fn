import type {AnyConstructor, AnyFunction, Primitive} from './types';
import {isNull} from './values';

type TypesMap = {
    'undefined': undefined;
    'boolean':   boolean;
    'string':    string;
    'number':    number;
    'bigint':    bigint;
    'symbol':    symbol;
    'object':    Record<PropertyKey, unknown>;
    'function':  AnyFunction;
};

export type TypeofResult = keyof TypesMap;

const makeTypeofGuard = <T extends TypeofResult>(type: T) =>
    (v: unknown): v is TypesMap[T] =>
        // eslint-disable-next-line valid-typeof
        typeof v === type;

const isObjectRaw = /*@__PURE__*/makeTypeofGuard('object');

export const isObject = (v =>
    !isNull(v) && isObjectRaw(v)) as typeof isObjectRaw;

export const isFunction = /*@__PURE__*/makeTypeofGuard('function');
export const isSymbol = /*@__PURE__*/makeTypeofGuard('symbol');
export const isString = /*@__PURE__*/makeTypeofGuard('string');
export const isNumber = /*@__PURE__*/makeTypeofGuard('number');
export const isBigInt = /*@__PURE__*/makeTypeofGuard('bigint');
export const isBoolean = /*@__PURE__*/makeTypeofGuard('boolean');
export const isUndefined = /*@__PURE__*/makeTypeofGuard('undefined');

export const isPropertyKey = (v: unknown): v is PropertyKey =>
    isString(v) || isNumber(v) || isSymbol(v);

export const isNullable = (v: unknown): v is null | undefined =>
    isNull(v) || isUndefined(v);

export const isNonNullable = <T>(v: T): v is NonNullable<T> =>
    !isNullable(v);

export const isPrimitive = (v: unknown): v is Primitive =>
    isNullable(v) || isPropertyKey(v) || isBoolean(v) || isBigInt(v);

export const isObjectLike = (v: unknown): v is TypesMap['object' | 'function'] =>
    isObject(v) || isFunction(v);

export const isConstructor = (v: unknown): v is AnyConstructor & AnyFunction =>
    isFunction(v) && isObjectLike(v.prototype) && v === v.prototype.constructor;
