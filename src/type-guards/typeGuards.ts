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

function makeGuard<T extends keyof TypesMap>(type: T): (v: unknown) => v is TypesMap[T] {
    return (v): v is TypesMap[T] => typeof v === type;
}

export const isUndefined = makeGuard('undefined');
export const isVoid = isUndefined as (v: unknown) => v is void;
export const isBoolean = makeGuard('boolean');
export const isString = makeGuard('string');
export const isNumber = makeGuard('number');
export const isBigInt = makeGuard('bigint');
export const isSymbol = makeGuard('symbol');
export const isObject = makeGuard('object');
export const isFunction = makeGuard('function');