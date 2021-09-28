import type {AnyFn} from './functions';

type TypeofMap = {
    'undefined': undefined;
    'boolean':   boolean;
    'string':    string;
    'number':    number;
    'bigint':    bigint;
    'symbol':    symbol;
    'object':    null | Record<PropertyKey, unknown>;
    'function':  AnyFn<unknown> & Record<PropertyKey, unknown>;
};

const makeTypeofGuard = <T extends keyof TypeofMap>(type: T) =>
    (v: unknown): v is TypeofMap[T] =>
        typeof v === type; // eslint-disable-line valid-typeof

export const isUndefined = /*@__PURE__*/makeTypeofGuard('undefined');
export const isBoolean = /*@__PURE__*/makeTypeofGuard('boolean');
export const isString = /*@__PURE__*/makeTypeofGuard('string');
export const isNumber = /*@__PURE__*/makeTypeofGuard('number');
export const isBigInt = /*@__PURE__*/makeTypeofGuard('bigint');
export const isSymbol = /*@__PURE__*/makeTypeofGuard('symbol');
export const isObject = /*@__PURE__*/makeTypeofGuard('object');
export const isFunction = /*@__PURE__*/makeTypeofGuard('function');

// it reports type mismatch if typeof will be extended in future standards
declare const __unknownValue: unknown;
const __checkAllTypesUsed = (): keyof TypeofMap =>
    typeof __unknownValue;
/*@__PURE__*/__checkAllTypesUsed();
