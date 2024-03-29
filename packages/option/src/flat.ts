import {_assert} from './_util';
import {isOption} from './guards';
import {patch, checkPatchValue} from './internal';
import type {Option} from './option';
import {None} from './option';

export const flat = <T>(option: Option<Option<T>>): Option<T> =>
    option.flat();

patch((kind, value) =>
    (checkPatchValue(value, kind)
        ? {
            flat<U>(this: Option<Option<U>>): Option<U> {
                _assert(isOption(value), 'flat may called only on nested Option', TypeError);
                return value as Option<U>;
            },
        }
        : {
            flat: () =>
                None,
        }), false);
