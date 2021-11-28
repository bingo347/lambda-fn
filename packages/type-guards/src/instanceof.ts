import type {AnyAbstractConstructor} from '@lambda-fn/basis';

/**
 * Creates instance guard from constructor
 * @param constructor Constructor that instances guard will check
 * @returns Guard that checks instances
 */
export const makeInstanceofGuard = <C extends AnyAbstractConstructor>(constructor: C) =>
    (v: unknown): v is InstanceType<C> =>
        v instanceof constructor;

/** Guard for RegExp type */
export const isRegExp = /*@__PURE__*/makeInstanceofGuard(RegExp);

/** Guard for Promise type */
export const isPromise = /*@__PURE__*/makeInstanceofGuard(Promise);

/** Guard for Date type */
export const isDate = /*@__PURE__*/makeInstanceofGuard(Date);

/** Guard for Error type */
export const isError = /*@__PURE__*/makeInstanceofGuard(Error);

