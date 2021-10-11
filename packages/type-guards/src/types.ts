export type TypeGuard<T extends V, V = unknown, Args extends unknown[] = unknown[]> = (v: V, ...args: Args) => v is T;

export type AnyFunction = (...args: any[]) => unknown;
export type AnyConstructor = new (...args: any[]) => unknown;

export type Primitive =
    | null
    | undefined
    | string
    | number
    | boolean
    | bigint
    | symbol;
