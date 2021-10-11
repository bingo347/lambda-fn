import type {AnyAbstractConstructor} from '@lambda-fn/basis';

export const makeInstanceofGuard = <C extends AnyAbstractConstructor>(constructor: C) =>
    (v: unknown): v is InstanceType<C> =>
        v instanceof constructor;

export const isRegExp = /*@__PURE__*/makeInstanceofGuard(RegExp);
export const isPromise = /*@__PURE__*/makeInstanceofGuard(Promise);
export const isDate = /*@__PURE__*/makeInstanceofGuard(Date);
export const isError = /*@__PURE__*/makeInstanceofGuard(Error);

