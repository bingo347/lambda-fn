import type {UnboundFn} from './functions';
import {partial} from './functions';

export type Constructor<I, Args extends unknown[]> = new (...args: Args) => I;

export type AbstractConstructor<I, Args extends unknown[]> = abstract new (...args: Args) => I;

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- bug in typescript predicates
export type AnyConstructor<I = any> = new (...args: any[]) => I;

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- bug in typescript predicates
export type AnyAbstractConstructor<I = any> = abstract new (...args: any[]) => I;

export type AsFactory<I, C extends AnyConstructor<I>> = UnboundFn<I, ConstructorParameters<C>>;

export const asFactory = <I, C extends AnyConstructor<I>>(constructor: C): AsFactory<I, C> =>
    partial<I, [C], ConstructorParameters<C>>(create, constructor);

export const create = <I, C extends AnyConstructor<I>>(
    constructor: C,
    ...args: ConstructorParameters<C>
): I =>
    new constructor(...args);
