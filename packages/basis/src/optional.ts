import {InternalCell} from './InternalCell';
import type {Monad} from './categories';
import {internal} from './internal';
import {assert} from './panic';
import type {Constructor} from './utils/constructors';
import {create} from './utils/constructors';
import type {Fn} from './utils/functions';
import {isUndefined} from './utils/guards';

export const enum OptionalKind {
    None,
    Some,
}

const getKind = (optional: Optional<unknown>): OptionalKind =>
    optional[internal.KIND];

const isSome = (kind: OptionalKind): kind is OptionalKind.Some =>
    kind === OptionalKind.Some;

export class Optional<T> implements Monad<T> {
    protected readonly [internal.KIND]: OptionalKind;

    private readonly __cell: null | InternalCell<T>;

    public static readonly None = new Optional<never>(OptionalKind.None);

    public static of(value: null | undefined): Optional<never>;
    public static of<V>(value: V): Optional<NonNullable<V>>;
    public static of<V>(value: V): Optional<NonNullable<V>> {
        return isUndefined(value)
            ? Optional.None
            : create(this, OptionalKind.Some, value);
    }

    constructor(kind: OptionalKind.None);
    constructor(Kind: OptionalKind.Some, value: T);
    constructor(kind: OptionalKind, value?: T) {
        this[internal.KIND] = kind;
        this.__cell = isSome(kind)
            ? create(InternalCell, value)
            : null;
    }

    public expect(message: string): T {
        assert(isSome(getKind(this)), message, TypeError);
        return this.__unsafeSome;
    }

    public unwrap(): T {
        return this.expect('Called unwrap for Optional on a None value');
    }

    public map<R>(f: Fn<R, [value: T]>): Optional<R> {
        return isSome(getKind(this))
            ? this.__unsafeClone(f(this.__unsafeSome))
            : Optional.None;
    }

    public andThen<R>(f: Fn<Optional<R>, [value: T]>): Optional<R> {
        return isSome(getKind(this))
            ? f(this.__unsafeSome)
            : Optional.None;
    }

    public apply<V, R>(this: Optional<Fn<R, [value: V]>>, target: Optional<V>): Optional<R> {
        return isSome(getKind(this))
            ? target.map(this.__unsafeSome)
            : Optional.None;
    }

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

    protected get __unsafeSome(): T {
        return this.__cell!.unsafeValue;
    }
}