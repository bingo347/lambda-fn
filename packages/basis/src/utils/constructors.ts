import type {UnboundFn} from './functions';
import {partial} from './functions';

/** Helper for create constructor signatures */
export type Constructor<I, Args extends unknown[]> = new (...args: Args) => I;

/** Helper for create abstract constructor signatures */
export type AbstractConstructor<I, Args extends unknown[]> = abstract new (...args: Args) => I;

/** Helper for create constructor type predicates */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- bug in typescript predicates
export type AnyConstructor<I = any> = new (...args: any[]) => I;

/** Helper for create abstract constructor type predicates */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- bug in typescript predicates
export type AnyAbstractConstructor<I = any> = abstract new (...args: any[]) => I;

/** Transforms constructor signature to function signature */
export type AsFactory<I, C extends AnyConstructor<I>> = UnboundFn<I, ConstructorParameters<C>>;

/**
 * Transforms constructor to factory
 * @param constructor Any non abstract constructor
 * @returns Function with some params but callable without new operator
 *
 * @example
 * ```typescript
 * class A {}
 * const createA = asFactory(A);
 * // Valid and returns instance of A
 * const a = createA();
 * ```
 */
export const asFactory = <I, C extends AnyConstructor<I>>(constructor: C): AsFactory<I, C> =>
    partial<I, [C], ConstructorParameters<C>>(create, constructor);

/**
 * Helper for create instance from constructor
 * @param constructor Any non abstract constructor
 * @param args constructor arguments
 * @returns created instance
 */
export const create = <I, C extends AnyConstructor<I>>(
    constructor: C,
    ...args: ConstructorParameters<C>
): I =>
    new constructor(...args);
