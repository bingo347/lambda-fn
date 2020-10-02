import {makeTag, InferTag} from '../_util-old';

export const taggerOk = makeTag('Ok');
export const taggerErr = makeTag('Err');

export type Ok<T> = {
    readonly $: InferTag<typeof taggerOk>;
    readonly v: T;
};
export type Err<E> = {
    readonly $: InferTag<typeof taggerErr>;
    readonly v: E;
};
export type Result<T, E> = Ok<T> | Err<E>;
