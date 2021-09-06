export type Fn<R, Args extends unknown[], This = unknown> = unknown extends This
    ? (...args: Args) => R
    : (this: This, ...args: Args) => R;

export type UnboundFn<R, Args extends unknown[]> = (this: void, ...args: Args) => R;

export type AnyFn = (...args: any[]) => unknown;

export const noop = (): void =>
    void 0;

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

/** @internal */
export const __fnNameLengthHint = <F>(f: F, {name, length}: {name: string; length: number}): F => {
    // eslint-disable-next-line no-restricted-syntax
    try {
        Object.defineProperty(f, 'name', {
            configurable: true,
            value:        name,
        });
        Object.defineProperty(f, 'length', {
            configurable: true,
            value:        length,
        });
    } catch (_: unknown) {}
    return f;
};
