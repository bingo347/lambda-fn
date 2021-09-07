import type {UnboundFn} from './functions';
import {partial} from './functions';

export type Constructor<I, Args extends unknown[]> = new (...args: Args) => I;

export type AbstractConstructor<I, Args extends unknown[]> = abstract new (...args: Args) => I;

export type AnyConstructor = new (...args: any[]) => unknown;

export type AnyAbstractConstructor = abstract new (...args: any[]) => unknown;

export type AsFactory<C extends AnyConstructor> = UnboundFn<InstanceType<C>, ConstructorParameters<C>>;

export const asFactory = <C extends AnyConstructor>(constructor: C): AsFactory<C> =>
    partial(create, constructor);

export const create = <C extends AnyConstructor>(
    constructor: C,
    ...args: ConstructorParameters<C>
): InstanceType<C> =>
    new (constructor as unknown as Constructor<InstanceType<C>, ConstructorParameters<C>>)(...args);
