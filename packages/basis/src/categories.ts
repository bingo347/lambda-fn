import type {Fn} from './utils/functions';

/**
 * Interface for Functor category
 * @ignore
 */
export interface Functor<T> {
    map<R>(f: Fn<R, [value: T]>): Functor<R>;
}

/**
 * Interface for Applicative Functor category
 * @ignore
 */
export interface ApplicativeFunctor<T> extends Functor<T> {
    apply<V, R>(this: Functor<Fn<R, [value: V]>>, target: Functor<V>): Functor<R>;
}

/**
 * Interface for Monad category
 * @ignore
 */
export interface Monad<T> extends ApplicativeFunctor<T> {
    unwrap(): T;
    andThen<R>(f: Fn<Monad<R>, [value: T]>): Monad<R>;
}

/**
 * Interface for Monad factory
 * @ignore
 */
export interface MonadOf {
    of<V>(this: void, value: V): Monad<V>;
}
