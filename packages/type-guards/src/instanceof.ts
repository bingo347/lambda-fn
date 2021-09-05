import type {AnyConstructor} from './types';

export const makeInstanceofGuard = <C extends AnyConstructor>(constructor: C) =>
    (v: unknown): v is InstanceType<C> =>
        v instanceof constructor;

export const isRegExp = /*@__PURE__*/makeInstanceofGuard(RegExp);
export const isPromise = /*@__PURE__*/makeInstanceofGuard(Promise);
export const isDate = /*@__PURE__*/makeInstanceofGuard(Date);
export const isError = /*@__PURE__*/makeInstanceofGuard(Error);

