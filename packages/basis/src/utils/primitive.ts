export type Primitive =
    | null
    | undefined
    | string
    | number
    | boolean
    | bigint
    | symbol;

declare const purely: unique symbol;
export type LiteralUnion<Literals, Basis extends Primitive> =
    Literals | (Basis & {[purely]?: never});
