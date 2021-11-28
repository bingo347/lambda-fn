/** Shorthand for guard signature */
export type TypeGuard<T extends V, V = unknown, Args extends unknown[] = []> = (v: V, ...args: Args) => v is T;
