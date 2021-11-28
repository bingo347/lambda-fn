type PrimitiveMap = {
    s:  string;
    n:  number;
    bi: bigint;
    b:  boolean;
    sy: symbol;
    nl: null;
    u:  undefined;
};

/** Shorthand for all primitive types union */
export type Primitive = PrimitiveMap[keyof PrimitiveMap];

/** Get base type from literal type */
export type LiteralBase<Literal extends Primitive> = {
    [K in keyof PrimitiveMap]: Literal extends PrimitiveMap[K] ? PrimitiveMap[K] : never;
}[keyof PrimitiveMap];

declare const purely: unique symbol;

/** Create primitive type with IDE autocompletion for most used literals */
export type LiteralUnion<Literals, Basis extends Primitive = LiteralBase<Literals & Primitive>> =
    Literals | (Basis & {[purely]?: never});
