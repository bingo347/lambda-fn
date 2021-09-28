/* eslint-disable @typescript-eslint/no-namespace */

import {
    isUndefined,
    isBoolean,
    isString,
    isNumber,
    isBigInt,
    isSymbol,
    isObject,
    isFunction,
} from './utils/guards';

/** @ignore */
export namespace internal {
    export const KIND = Symbol();
}

/** @ignore */
export namespace guards {
    export const u = isUndefined;
    export const b = isBoolean;
    export const s = isString;
    export const n = isNumber;
    export const bi = isBigInt;
    export const sy = isSymbol;
    export const o = isObject;
    export const f = isFunction;
}
