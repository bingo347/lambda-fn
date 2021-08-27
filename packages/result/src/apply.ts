import {isFunction} from '@lambda-fn/type-guards';
import {_assert} from './_util';
import {impl} from './internal';
import type {Result} from './result';
import {Err} from './result';

impl('apply', (mapper =>
    // @ts-expect-error: TODO:
    <U, O>(target: Result<U, O>) => {
        _assert(isFunction(mapper), 'apply may called only on Result with function', TypeError);
        return target.map(mapper);
    }), (error =>
    () =>
        Err(error)), false);
