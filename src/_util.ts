export const getSymbolFieldValue = <O extends Record<symbol, any>, S extends keyof O>(obj: O, key: S): O[S] => obj[key];

export const makeDescriptor = (value: unknown, configurable = false, enumerable = false, writable = false): PropertyDescriptor => ({
    value,
    configurable,
    enumerable,
    writable
});
