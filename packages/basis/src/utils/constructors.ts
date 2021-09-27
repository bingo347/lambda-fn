import type {UnboundFn} from './functions';
import {partial} from './functions';

export type Constructor<I, Args extends unknown[]> = new (...args: Args) => I;

export type AbstractConstructor<I, Args extends unknown[]> = abstract new (...args: Args) => I;

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- bug in typescript predicates
export type AnyConstructor = new (...args: any[]) => any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- bug in typescript predicates
export type AnyAbstractConstructor = abstract new (...args: any[]) => any;

export type AsFactory<C extends AnyConstructor> = UnboundFn<InstanceType<C>, ConstructorParameters<C>>;

export const asFactory = <C extends AnyConstructor>(constructor: C): AsFactory<C> =>
    partial(create, constructor);

export const create = <C extends AnyConstructor>(
    constructor: C,
    ...args: ConstructorParameters<C>
): InstanceType<C> =>
    new constructor(...args); // eslint-disable-line @typescript-eslint/no-unsafe-return
