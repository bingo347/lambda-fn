type TypesMap = {
    'undefined': undefined;
    'boolean': boolean;
    'string': string;
    'number': number;
    'bigint': bigint;
    'symbol': symbol;
    'object': Record<string | symbol | number, unknown>;
    'function': (...args: unknown[]) => unknown;
};

const makeTypeofGuard = <T extends keyof TypesMap>(type: T) => (
    (v: unknown): v is TypesMap[T] => typeof v === type
);

export const isUndefined = makeTypeofGuard('undefined');
export const isVoid = isUndefined as (v: unknown) => v is void;
export const isBoolean = makeTypeofGuard('boolean');
export const isString = makeTypeofGuard('string');
export const isNumber = makeTypeofGuard('number');
export const isBigInt = makeTypeofGuard('bigint');
export const isSymbol = makeTypeofGuard('symbol');
export const isObject = makeTypeofGuard('object');
export const isFunction = makeTypeofGuard('function');
export const isNull = (v: unknown): v is null => v === null;