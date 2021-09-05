import type {TypeGuard, Primitive} from './types';

export const isEqualTo = ((value: Primitive, ...vs: [] | [unknown]) => {
    const guard = (v: unknown) =>
        value === v;
    return vs.length === 0
        ? guard
        : guard(vs[0]);
}) as {
    <V extends Primitive>(value: V): TypeGuard<V>;
    <V extends Primitive>(value: V, v: unknown): v is V;
};

export const isNull = /*@__PURE__*/isEqualTo(null);
