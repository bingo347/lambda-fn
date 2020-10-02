export const makeDescriptor = (value: any, configurable = false, enumerable = false, writable = false): PropertyDescriptor => ({
    value,
    configurable,
    enumerable,
    writable
});
