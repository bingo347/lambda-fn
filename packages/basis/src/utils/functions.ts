export type Fn<R, Args extends unknown[], This = unknown> = unknown extends This
    ? (...args: Args) => R
    : (this: This, ...args: Args) => R;

export type UnboundFn<R, Args extends unknown[]> = Fn<R, Args, void>;

export type VoidFn<Args extends unknown[], This = unknown> = Fn<void, Args, This>;

export type UnboundVoidFn<Args extends unknown[]> = Fn<void, Args, void>;

export type AnyFn = (...args: any[]) => unknown;

export const noop = (): void =>
    void 0;

export const identity = <T>(value: T): T =>
    value;

export type AsFunction<T> = () => T;

export const asFunction = <T>(value: T): AsFunction<T> =>
    () =>
        value;

export const partial = <R, A1 extends unknown[], A2 extends unknown[], This = unknown>(
    f: Fn<R, [...A1, ...A2], This>,
    ...args1: A1
): Fn<R, A2, This> =>
    __fnNameLengthHint(function partially(this: This, ...args2) {
        return f.call(this, ...args1, ...args2);
    }, f);

export const contextify = <R, Args extends unknown[], This>(f: UnboundFn<R, [This, ...Args]>): Fn<R, Args, This> =>
    __fnNameLengthHint(function contextified(this: This, ...args) {
        return f(this, ...args);
    }, f, -1);

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
