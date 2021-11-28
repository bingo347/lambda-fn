import type {Primitive} from '@lambda-fn/basis';
import type {TypeGuard} from './types';

/** Guard that checks two primitive values are equal */
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

/** Guard for null type */
export const isNull = /*@__PURE__*/isEqualTo(null);
