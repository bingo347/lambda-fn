export const makeDescriptor = (value: unknown, configurable = false, enumerable = false, writable = false): PropertyDescriptor => ({
    value,
    configurable,
    enumerable,
    writable
});
