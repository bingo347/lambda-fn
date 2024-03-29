import {_assert} from './_util';
import {isResult} from './guards';
import {impl} from './internal';
import type {Result} from './result';
import {Err} from './result';

export const flat = <U, O, E>(result: Result<Result<U, O>, E>): Result<U, E | O> =>
    result.flat();
impl('flat', (innerResult =>
    <U, O>() => {
        _assert(isResult(innerResult), 'flat may called only on nested Result', TypeError);
        return innerResult as Result<U, O>;
    }), (error =>
    () =>
        Err(error)), false);
