import {makeTag, InferTag} from '../_util-old';

export const taggerSome = makeTag('Some');
export const taggerNone = makeTag('None');

export type Some<T> = {
    readonly $: InferTag<typeof taggerSome>;
    readonly v: T;
};
export type None = {
    readonly $: InferTag<typeof taggerNone>;
};
export type Option<T> = Some<T> | None;
