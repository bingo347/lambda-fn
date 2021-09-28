import {InternalCell} from './InternalCell';
import type {Monad} from './categories';
import {internal} from './internal';
import {assert} from './panic';
import type {Constructor} from './utils/constructors';
import {create} from './utils/constructors';
import type {Fn} from './utils/functions';

export const enum ResultingKind {
    Err,
    Ok,
}

export class Resulting<O, E> implements Monad<O> {
    protected readonly [internal.KIND]: ResultingKind;

    private readonly __cell: InternalCell<O | E>;

    public static of<V>(value: V): Resulting<V, unknown> {
        return create(this, ResultingKind.Ok, value);
    }

    constructor(Kind: ResultingKind.Err, error: E);
    constructor(kind: ResultingKind.Ok, value: O);
    constructor(kind: ResultingKind, value: O | E) {
        this[internal.KIND] = kind;
        this.__cell = create(InternalCell, value);
    }

    public expect(message: string): O {
        assert(isOk(getKind(this)), message, TypeError);
        return this.__unsafeOk;
    }

    public unwrap(): O {
        return this.expect('Called unwrap for Resulting on a Err value');
    }

    public map<R>(f: Fn<R, [value: O]>): Resulting<R, E> {
        return this.__unsafeClone<R, E>(isOk(getKind(this))
            ? f(this.__unsafeOk)
            : void 0);
    }

    public andThen<R>(f: Fn<Resulting<R, E>, [value: O]>): Resulting<R, E> {
        return isOk(getKind(this))
            ? f(this.__unsafeOk)
            : this.__unsafeClone();
    }

    public apply<V, R, TE>(this: Resulting<Fn<R, [value: V]>, E>, target: Resulting<V, TE>): Resulting<R, E | TE> {
        return isOk(getKind(this))
            ? target.map(this.__unsafeOk)
            : this.__unsafeClone();
    }

    protected __unsafeClone<RO, RE>(value: O | E | RO | RE = this.__unsafeOk): Resulting<RO, RE> {
        type C = Constructor<Resulting<RO, RE>, [ResultingKind, O | E | RO | RE]>;
        const {constructor} = this;
        return create(
            constructor as C,
            getKind(this),
            value,
        );
    }

    protected get __unsafeOk(): O {
        return this.__cell.unsafeValue as O;
    }

    protected get __unsafeErr(): E {
        return this.__cell.unsafeValue as E;
    }
}

const getKind = (resulting: Resulting<unknown, unknown>): ResultingKind =>
    resulting[internal.KIND];

const isOk = (kind: ResultingKind): kind is ResultingKind.Ok =>
    kind === ResultingKind.Ok;
