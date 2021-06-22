import {Option, Some, None} from './option';
import {fromNullable} from './fromNullable';
import {assertSome} from './unwrapping';
import {isSome} from './guards';
import {VALUE} from './internal';
import {getSymbolFieldValue} from './_util';

/** @deprecated use Some */
export const some = Some;

/** @deprecated use None */
export const none = None;

/** @deprecated use assertSome */
export const assert = assertSome;

/** @deprecated use chain with .and() or .zip() or .zipWith() methods */
export function and<T1, T2>(o1: Option<T1>, o2: Option<T2>): Option<[T1, T2]>;
/** @deprecated use chain with .and() or .zip() or .zipWith() methods */
export function and<T1, T2, T3>(o1: Option<T1>, o2: Option<T2>, o3: Option<T3>): Option<[T1, T2, T3]>;
/** @deprecated use chain with .and() or .zip() or .zipWith() methods */
export function and<T1, T2, T3, T4>(o1: Option<T1>, o2: Option<T2>, o3: Option<T3>, o4: Option<T4>): Option<[T1, T2, T3, T4]>;
/** @deprecated use chain with .and() or .zip() or .zipWith() methods */
export function and<T1, T2, T3, T4, T5>(o1: Option<T1>, o2: Option<T2>, o3: Option<T3>, o4: Option<T4>, o5: Option<T5>): Option<[T1, T2, T3, T4, T5]>;
/** @deprecated use chain with .and() or .zip() or .zipWith() methods */
export function and<T1, T2, T3, T4, T5, T6>(o1: Option<T1>, o2: Option<T2>, o3: Option<T3>, o4: Option<T4>,
    o5: Option<T5>, o6: Option<T6>): Option<[T1, T2, T3, T4, T5, T6]>;
/** @deprecated use chain with .and() or .zip() or .zipWith() methods */
export function and<T1, T2, T3, T4, T5, T6, T7>(o1: Option<T1>, o2: Option<T2>, o3: Option<T3>, o4: Option<T4>,
    o5: Option<T5>, o6: Option<T6>, o7: Option<T7>): Option<[T1, T2, T3, T4, T5, T6, T7]>;
/** @deprecated use chain with .and() or .zip() or .zipWith() methods */
export function and<T1, T2, T3, T4, T5, T6, T7, T8>(o1: Option<T1>, o2: Option<T2>, o3: Option<T3>, o4: Option<T4>,
    o5: Option<T5>, o6: Option<T6>, o7: Option<T7>, o8: Option<T8>): Option<[T1, T2, T3, T4, T5, T6, T7, T8]>;
/** @deprecated use chain with .and() or .zip() or .zipWith() methods */
export function and<T1, T2, T3, T4, T5, T6, T7, T8, T9>(o1: Option<T1>, o2: Option<T2>, o3: Option<T3>, o4: Option<T4>,
    o5: Option<T5>, o6: Option<T6>, o7: Option<T7>, o8: Option<T8>, o9: Option<T9>): Option<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
/** @deprecated use chain with .and() or .zip() or .zipWith() methods */
export function and<TS extends any[]>(...options: [Option<TS[number]>, Option<TS[number]>, ...Option<TS[number]>[]]): Option<TS>;
export function and(...options: Option<any>[]): Option<any[]> {
    return (options.every(isSome)
        ? Some(options.map(o => getSymbolFieldValue(o, VALUE)))
        : None
    );
}

/** @deprecated use chain with .or() method */
export function or<T1, T2>(o1: Option<T1>, o2: Option<T2>): Option<T1 | T2>;
/** @deprecated use chain with .or() method */
export function or<T1, T2, T3>(o1: Option<T1>, o2: Option<T2>, o3: Option<T3>): Option<T1 | T2 | T3>;
/** @deprecated use chain with .or() method */
export function or<T1, T2, T3, T4>(o1: Option<T1>, o2: Option<T2>, o3: Option<T3>, o4: Option<T4>): Option<T1 | T2 | T3 | T4>;
/** @deprecated use chain with .or() method */
export function or<T1, T2, T3, T4, T5>(o1: Option<T1>, o2: Option<T2>, o3: Option<T3>, o4: Option<T4>, o5: Option<T5>): Option<T1 | T2 | T3 | T4 | T5>;
/** @deprecated use chain with .or() method */
export function or<T1, T2, T3, T4, T5, T6>(o1: Option<T1>, o2: Option<T2>, o3: Option<T3>, o4: Option<T4>,
    o5: Option<T5>, o6: Option<T6>): Option<T1 | T2 | T3 | T4 | T5 | T6>;
/** @deprecated use chain with .or() method */
export function or<T1, T2, T3, T4, T5, T6, T7>(o1: Option<T1>, o2: Option<T2>, o3: Option<T3>, o4: Option<T4>,
    o5: Option<T5>, o6: Option<T6>, o7: Option<T7>): Option<T1 | T2 | T3 | T4 | T5 | T6 | T7>;
/** @deprecated use chain with .or() method */
export function or<T1, T2, T3, T4, T5, T6, T7, T8>(o1: Option<T1>, o2: Option<T2>, o3: Option<T3>, o4: Option<T4>,
    o5: Option<T5>, o6: Option<T6>, o7: Option<T7>, o8: Option<T8>): Option<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>;
/** @deprecated use chain with .or() method */
export function or<T1, T2, T3, T4, T5, T6, T7, T8, T9>(o1: Option<T1>, o2: Option<T2>, o3: Option<T3>, o4: Option<T4>,
    o5: Option<T5>, o6: Option<T6>, o7: Option<T7>, o8: Option<T8>, o9: Option<T9>): Option<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>;
/** @deprecated use chain with .or() method */
export function or<TS extends any[]>(...options: [Option<TS[number]>, Option<TS[number]>, ...Option<TS[number]>[]]): Option<TS[number]>;
export function or(...options: Option<any>[]): Option<any> {
    return fromNullable(options.find(isSome)).flat();
}
