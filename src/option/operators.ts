import {Some, Option, isSome, assert, some, none} from './index';

const get = <T>(option: Some<T>) => option.v;

export function expect<T>(option: Option<T>, msg: string): T {
    assert(option, msg);
    return get(option);
}

export function unwrap<T>(option: Option<T>): T {
    return expect(option, 'Called unwrap for Option on a None value');
}

export function unwrapOr<T>(option: Option<T>, defaultValue: T): T {
    return isSome(option) ? get(option) : defaultValue;
}

export function unwrapOrElse<T>(option: Option<T>, lazy: () => T): T {
    return isSome(option) ? get(option) : lazy();
}

export function and<T, R>(left: Option<T>, right: Option<R>): Option<R> {
    return (isSome(left) && isSome(right)
        ? some(get(right))
        : none
    );
}

export function andThen<T, R>(option: Option<T>, f: (value: T) => Option<R>): Option<R> {
    return (isSome(option)
        ? f(get(option))
        : none
    );
}

export function or<T>(left: Option<T>, right: Option<T>): Option<T> {
    return (isSome(left)
        ? some(get(left))
        : (isSome(right)
            ? some(get(right))
            : none
        )
    );
}

export function orElse<T>(option: Option<T>, f: () => Option<T>): Option<T> {
    return (isSome(option)
        ? some(get(option))
        : f()
    );
}

export function xor<T>(left: Option<T>, right: Option<T>): Option<T> {
    return (isSome(left)
        ? (isSome(right)
            ? none
            : some(get(left))
        )
        : (isSome(right)
            ? some(get(right))
            : none
        )
    );
}

export function contains<T>(option: Option<T>, value: T): boolean {
    return isSome(option) ? get(option) === value : false;
}

export function filter<T>(option: Option<T>, predicate: (value: T) => boolean): Option<T> {
    return isSome(option) && predicate(get(option)) ? some(get(option)) : none;
}

export function map<T, R>(option: Option<T>, mapper: (value: T) => R): Option<R> {
    return isSome(option) ? some(mapper(get(option))) : none;
}

export function flat<T>(option: Option<Option<T>>): Option<T> {
    return (isSome(option)
        ? get(option)
        : none
    );
}

export function match<T, R>(option: Option<T>, onSome: (value: T) => R, onNone: () => R): R {
    return (isSome(option)
        ? onSome(get(option))
        : onNone()
    );
}