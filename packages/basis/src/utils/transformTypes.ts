import type {Fn} from './functions';

export type UnionToIntersection<U> =
    (U extends unknown ? Fn<unknown, [U]> : never) extends Fn<unknown, [infer I]> ? I : never;
