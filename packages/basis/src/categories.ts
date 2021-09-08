import {InternalCell} from './InternalCell';
import {internal} from './internal';
import type {Constructor} from './utils/constructors';
import {create} from './utils/constructors';
import type {Fn} from './utils/functions';

export abstract class Functor<T> extends InternalCell<T> {
    public map<R>(f: Fn<R, [value: T]>): Functor<R> {
        const value = f(this[internal.InternalCellUnsafeValue]);
        return this[internal.InternalCellContextualFactory](value);
    }

    protected abstract override [internal.InternalCellContextualFactory]<V>(value: V): Functor<V>;
}

export abstract class Applicative<T> extends Functor<T> {
    public apply<V, R>(this: Applicative<Fn<R, [value: V]>>, target: Functor<V>): Functor<R> {
        return target.map(this[internal.InternalCellUnsafeValue]);
    }
}

export abstract class Monad<T> extends Applicative<T> {
    public static of<V, M extends Monad<V>>(this: Constructor<M, [value: V]>, value: V): M {
        return create(this, value);
    }

    public unwrap(): T {
        return this[internal.InternalCellUnsafeValue];
    }

    public andThen<R>(f: Fn<Monad<R>, [value: T]>): Monad<R> {
        return this.map(f).unwrap();
    }

    public override map<R>(f: Fn<R, [value: T]>): Monad<R> {
        return super.map(f) as Monad<R>;
    }

    public override apply<V, R>(this: Monad<Fn<R, [value: V]>>, target: Functor<V>): Monad<R> {
        return target.map(this[internal.InternalCellUnsafeValue]) as Monad<R>;
    }

    protected abstract override [internal.InternalCellContextualFactory]<V>(value: V): Monad<V>;
}
