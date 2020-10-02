import type {OptionInstance} from './option';

type PatchFN = <T>(
    kind: OptionKind,
    value: T | undefined
) => Partial<OptionInstance<T>>;

export const enum OptionKind { Some, None }
export const GUARD = Symbol();
export const patchers: [patcher: PatchFN, configurable: boolean][] = [];
export const patch = (cb: PatchFN, configurable = true): void => void patchers.push([cb, configurable]);
