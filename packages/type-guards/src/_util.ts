export type Mapper<V, R> = (value: V) => R;

export const getSymbolFieldValue = <O extends Record<symbol, any>, S extends keyof O>(obj: O, key: S): O[S] => obj[key];

export const makeDescriptor = (value: unknown, configurable = false, enumerable = false, writable = false): PropertyDescriptor => ({
    value,
    configurable,
    enumerable,
    writable
});

export function _assert(condition: boolean, error: Error): asserts condition;
export function _assert(condition: boolean, message: string, errorConstructor?: ErrorConstructor): asserts condition;
export function _assert(condition: boolean, messageOrError: string | Error, errorConstructor = Error): asserts condition {
    if(condition) { return; }
    if(messageOrError instanceof Error) {
        throw messageOrError;
    }
    throw new errorConstructor(messageOrError);
}
