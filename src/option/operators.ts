import {Some, Option, isSome, assert, some, none} from './index';
import {get} from '../_util';

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

export function and<T1, T2>(o1: Option<T1>, o2: Option<T2>): Option<[T1, T2]>;
export function and<T1, T2, T3>(o1: Option<T1>, o2: Option<T2>, o3: Option<T3>): Option<[T1, T2, T3]>;
export function and<T1, T2, T3, T4>(o1: Option<T1>, o2: Option<T2>, o3: Option<T3>, o4: Option<T4>): Option<[T1, T2, T3, T4]>;
export function and<T1, T2, T3, T4, T5>(o1: Option<T1>, o2: Option<T2>, o3: Option<T3>, o4: Option<T4>, o5: Option<T5>): Option<[T1, T2, T3, T4, T5]>;
export function and<T1, T2, T3, T4, T5, T6>(o1: Option<T1>, o2: Option<T2>, o3: Option<T3>, o4: Option<T4>, o5: Option<T5>,
    o6: Option<T6>): Option<[T1, T2, T3, T4, T5, T6]>;
export function and<T1, T2, T3, T4, T5, T6, T7>(o1: Option<T1>, o2: Option<T2>, o3: Option<T3>, o4: Option<T4>, o5: Option<T5>,
    o6: Option<T6>, o7: Option<T7>): Option<[T1, T2, T3, T4, T5, T6, T7]>;
export function and<T1, T2, T3, T4, T5, T6, T7, T8>(o1: Option<T1>, o2: Option<T2>, o3: Option<T3>, o4: Option<T4>, o5: Option<T5>,
    o6: Option<T6>, o7: Option<T7>, o8: Option<T8>): Option<[T1, T2, T3, T4, T5, T6, T7, T8]>;
export function and<T1, T2, T3, T4, T5, T6, T7, T8, T9>(o1: Option<T1>, o2: Option<T2>, o3: Option<T3>, o4: Option<T4>, o5: Option<T5>,
    o6: Option<T6>, o7: Option<T7>, o8: Option<T8>, o9: Option<T9>): Option<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
export function and<TS extends any[]>(...options: Option<TS[number]>[]): Option<TS>;
export function and(...options: Option<any>[]) {
    return (options.every(isSome)
        ? some((options as Some<any>[]).map(get))
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

export function clone<T>(option: Option<T>): Option<T> {
    return isSome(option) ? some(get(option)) : none;
}
