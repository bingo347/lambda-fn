export type TypeGuard<T extends V, V = unknown, Args extends unknown[] = unknown[]> = (v: V, ...args: Args) => v is T;
