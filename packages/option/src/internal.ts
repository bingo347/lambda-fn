import type {Option, Some, None} from './option';
import {makeDescriptor} from '../_util';

type PatchFN = <T>(
    kind: OptionKind,
    value?: T
) => Partial<Option<T>>;
const patchers: Array<[patcher: PatchFN, configurable: boolean]> = [];
let noneInstance: None;

// eslint-disable-next-line @typescript-eslint/no-shadow
export const enum OptionKind { Some, None }
export const GUARD = Symbol();
export const VALUE = Symbol();
export const patch = (cb: PatchFN, configurable = true): void => {
    patchers.push([cb, configurable]);
    mergeOption(noneInstance, cb(OptionKind.None), configurable);
};

export const isSomeKind = (kind: OptionKind): kind is OptionKind.Some => kind === OptionKind.Some;
export const isNoneKind = (kind: OptionKind): kind is OptionKind.None => kind === OptionKind.None;
export const checkPatchValue = <T>(v: T | undefined, kind: OptionKind): v is T => isSomeKind(kind);

export function makeOption<T>(kind: OptionKind.Some, value: T): Some<T>;
export function makeOption(kind: OptionKind.None): None;
export function makeOption<T>(kind: OptionKind, value?: T): Option<T> {
    const protoOption = Object.defineProperty((kind === OptionKind.Some
        ? Object.defineProperty({}, VALUE, makeDescriptor(value, false, true))
        : {}
    ), GUARD, makeDescriptor(kind, false, true)) as Option<T>;
    Object.defineProperty(protoOption, Symbol.toStringTag, {get: () => 'Option'});
    if(kind === OptionKind.None) {
        noneInstance = protoOption as None;
    }
    return patchers.reduce((option, [patcher, configurable]) => (
        mergeOption(option, patcher(kind, value), configurable),
        option
    ), protoOption);
}

function mergeOption<T>(option: Option<T>, optionPatch: Partial<Option<T>>, configurable: boolean) {
    for(const key of Object.getOwnPropertyNames(optionPatch) as (keyof Option<T>)[]) {
        Object.defineProperty(option, key, makeDescriptor(optionPatch[key], configurable));
    }
    for(const key of Object.getOwnPropertySymbols(optionPatch) as (keyof Option<T>)[]) {
        Object.defineProperty(option, key, makeDescriptor(optionPatch[key], configurable));
    }
}
