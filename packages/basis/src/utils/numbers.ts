import type {Strong} from './strongTypes';

export type StrongNumber<Input> = Strong<Input, number, 0>;

/**
 * Checks input type is bigint
 * @returns input type if it is bigint or 0n otherwise
 */
// eslint-disable-next-line eslint-comments/no-restricted-disable
// eslint-disable-next-line @typescript-eslint/no-magic-numbers -- bigint cannot be excluded
export type StrongBigint<Input> = Strong<Input, bigint, 0n>;
