export type TypeGuard<T extends A, A = unknown> = (v: A) => v is T;

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
