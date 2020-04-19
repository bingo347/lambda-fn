import {isUndefined, isNull} from '@lambda-fn/type-guards';
import {Some, None, Option, taggerSome, taggerNone} from './types';

export const some = <T>(value: T): Some<T> => taggerSome({v: value});
export const none: None = taggerNone({});

export function fromNullable<T>(value: T): Option<NonNullable<T>> {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return isUndefined(value) || isNull(value) ? none : some(value!);
}