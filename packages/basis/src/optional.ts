import {InternalCell} from './InternalCell';
import type {Monad} from './categories';
import {internal} from './internal';
import {assert} from './panic';
import type {Constructor} from './utils/constructors';
import {create} from './utils/constructors';
import type {Fn} from './utils/functions';
import {isUndefined} from './utils/guards';

/**
 * kind variants for {@link Optional}
 * @ignore
 */
export const enum OptionalKind {
    None,
    Some,
}

const getKind = (optional: Optional<unknown>): OptionalKind =>
    optional[internal.KIND];

const isSome = (kind: OptionalKind): kind is OptionalKind.Some =>
    kind === OptionalKind.Some;

/**
 * Base class for optional values
 * @ignore
 */
export class Optional<T> implements Monad<T> {
    /** @ignore */
    protected readonly [internal.KIND]: OptionalKind;

    private readonly __cell: null | InternalCell<T>;

    /** None instance of {@link Optional} */
    public static readonly None = new Optional<never>(OptionalKind.None);

    /**
     * Wrap value into {@link Optional}
     * @param value Value
     * @returns Some representation if value is non nullable or Optional.None
     */
    public static of(value: null | undefined): Optional<never>;
    /**
     * Wrap value into {@link Optional}
     * @param value Value
     * @returns Some representation if value is non nullable or Optional.None
     */
    public static of<V>(value: V): Optional<NonNullable<V>>;
    public static of<V>(value: V): Optional<NonNullable<V>> {
        return isUndefined(value)
            ? Optional.None
            : create(this, OptionalKind.Some, value);
    }

    constructor(kind: OptionalKind.None);
    constructor(kind: OptionalKind.Some, value: T);
    constructor(kind: OptionalKind, value?: T) {
        this[internal.KIND] = kind;
        this.__cell = isSome(kind)
            ? create(InternalCell, value)
            : null;
    }

    /**
     * Extract raw value from {@link Optional}
     * @param message Message for TypeError
     * @returns Raw value
     * @throws TypeError if {@link Optional} is None
     */
    public expect(message: string): T {
        assert(isSome(getKind(this)), message, TypeError);
        return this.__unsafeSome;
    }

    /**
     * Extract raw value from {@link Optional}
     * @returns Raw value
     * @throws TypeError if {@link Optional} is None
     */
    public unwrap(): T {
        return this.expect('Called unwrap for Optional on a None value');
    }

    /**
     * Transforms inner value
     * @param f Transformer for value
     * @returns New {@link Optional} with transformed value
     */
    public map<R>(f: Fn<R, [value: T]>): Optional<R> {
        return isSome(getKind(this))
            ? this.__unsafeClone(f(this.__unsafeSome))
            : Optional.None;
    }

    /**
     * Chains inner value to another {@link Optional}
     * @param f Transformer for value
     * @returns New {@link Optional} with chained value
     */
    public andThen<R>(f: Fn<Optional<R>, [value: T]>): Optional<R> {
        return isSome(getKind(this))
            ? f(this.__unsafeSome)
            : Optional.None;
    }

    /**
     * If this {@link Optional} contains `Some(function)` then map target {@link Optional} with it
     * @param target Target {@link Optional} for transformation
     * @returns New {@link Optional} with transformed value
     */
    public apply<V, R>(this: Optional<Fn<R, [value: V]>>, target: Optional<V>): Optional<R> {
        return isSome(getKind(this))
            ? target.map(this.__unsafeSome)
            : Optional.None;
    }

    /** @ignore */
    protected __unsafeClone<R>(v?: R): Optional<R> {
        type C = Constructor<Optional<R>, [OptionalKind.Some, (T | R)?]>;
        const value = v ?? this.__cell?.unsafeValue;
        const kind = getKind(this);
        const {constructor} = this;
        return isSome(kind)
            ? create(
                constructor as C,
                kind,
                value,
            )
            : Optional.None;
    }

    /** @ignore */
    protected get __unsafeSome(): T {
        return this.__cell!.unsafeValue;
    }
}
