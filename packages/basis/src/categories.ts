import type {Fn} from './utils/functions';

export interface Functor<T> {
    map<R>(f: Fn<R, [value: T]>): Functor<R>;
}

export interface ApplicativeFunctor<T> extends Functor<T> {
    apply<V, R>(this: Functor<Fn<R, [value: V]>>, target: Functor<V>): Functor<R>;
}

export interface Monad<T> extends ApplicativeFunctor<T> {
    unwrap(): T;
    andThen<R>(f: Fn<Monad<R>, [value: T]>): Monad<R>;
}

export interface MonadOf {
    of<V>(this: void, value: V): Monad<V>;
}
