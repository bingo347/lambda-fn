import {isFunction} from '@lambda-fn/type-guards';
import {Result, Err} from './result';
import {impl} from './internal';
import {_assert} from './_util';

impl('apply', (mapper => <U, R, O>(target: Result<U, O>) => {
    _assert(isFunction(mapper), 'apply may called only on Result with function', TypeError);
    return target.map(mapper) ;
}), (error => () => Err(error)), false);
