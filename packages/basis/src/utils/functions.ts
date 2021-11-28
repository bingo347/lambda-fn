/** Helper for create function signatures */
export type Fn<R, Args extends unknown[], This = unknown> = unknown extends This
    ? (...args: Args) => R
    : (this: This, ...args: Args) => R;

/** Helper for create unbound `(this: void)` function signatures */
export type UnboundFn<R, Args extends unknown[]> = Fn<R, Args, void>;

/** Helper for create function signatures that returns void */
export type VoidFn<Args extends unknown[], This = unknown> = Fn<void, Args, This>;

/** Helper for create unbound `(this: void)` function signatures that returns void */
export type UnboundVoidFn<Args extends unknown[]> = Fn<void, Args, void>;

/** Helper for create function type predicates */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- bug in typescript predicates
export type AnyFn<R = any> = (...args: any[]) => R;

/** It's doing nothing */
export const noop = (): void =>
    void 0;

/** Returns argument */
export const identity = <T>(value: T): T =>
    value;

/** Function representation of any type */
export type AsFunction<T> = () => T;

/** Transforms any value to function that always returns this value */
export const asFunction = <T>(value: T): AsFunction<T> =>
    () =>
        value;

/**
 * Partial application
 * @param f Any function
 * @param args1 1st part of function arguments
 * @returns Function with 2nd part of function arguments
 */
export const partial = <R, A1 extends unknown[], A2 extends unknown[], This = unknown>(
    f: Fn<R, [...A1, ...A2], This>,
    ...args1: A1
): Fn<R, A2, This> =>
    __fnNameLengthHint(function partially(this: This, ...args2) {
        return f.call(this, ...args1, ...args2);
    }, f);

/**
 * Wrap function to bounded variant
 * @param f Any function
 * @returns Function that calls original function with this as 1st argument
 *
 * @example
 * ```typescript
 * const originalMethod = SomeClass.prototype.method;
 * SomeClass.prototype.method = contextify((self: SomeClass, arg: string) => {
 *     // ... some patch ...
 *     return originalMethod.call(self, arg);
 * });
 * ```
 */
export const contextify = <R, Args extends unknown[], This>(f: UnboundFn<R, [This, ...Args]>): Fn<R, Args, This> =>
    __fnNameLengthHint(function contextified(this: This, ...args) {
        return f(this, ...args);
    }, f, -1);

/**
 * Wrap function to unbounded variant
 * @param f Any function
 * @param thisArg Context (`this`) for function `f`
 * @returns Unbounded function
 */
export const bind = <R, Args extends unknown[], This>(f: Fn<R, Args, This>, thisArg: This): UnboundFn<R, Args> =>
    __fnNameLengthHint((...args) =>
        f.apply(thisArg, args), f);

/** @internal */
export const __fnNameLengthHint = <F>(
    f: F,
    {name, length}: {name: string; length: number},
    lengthComplement = 0,
): F => {
    // eslint-disable-next-line no-restricted-syntax
    try {
        Object.defineProperty(f, 'name', {
            configurable: true,
            value:        name,
        });
        Object.defineProperty(f, 'length', {
            configurable: true,
            value:        Math.max(0, length + lengthComplement),
        });
    } catch (_: unknown) {}
    return f;
};
