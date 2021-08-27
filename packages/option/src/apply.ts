import {isFunction} from '@lambda-fn/type-guards';
import type {Mapper} from './_util';
import {_assert} from './_util';
import {patch, checkPatchValue} from './internal';
import {None} from './option';
import type {Option} from './option';

patch((kind, value) =>
    (checkPatchValue(value, kind)
        ? {
            apply<U, R>(this: Option<Mapper<U, R>>, target: Option<U>): Option<R> {
                _assert(isFunction(value), 'apply may called only on Option with function', TypeError);
                return target.map(value as Mapper<U, R>);
            },
        }
        : {
            apply: () =>
                None,
        }), false);
