import type {TypeofResult} from './typeof';
import {
    isString,
    isSymbol,
    isUndefined,
} from './typeof';

declare const __unknownValue: unknown;
__checkAllTypesUsed();

// it reports type mismatch if typeof will be extended in future standards
function __checkAllTypesUsed(): TypeofResult {
    return typeof __unknownValue;
}

test('isString', () => {
    expect(isString('')).toBe(true);
    expect(isString(0)).toBe(false);
});

test('isSymbol', () => {
    expect(isSymbol(Symbol())).toBe(true);
    expect(isSymbol('')).toBe(false);
});

test('isUndefined', () => {
    expect(isUndefined(void 0)).toBe(true);
    expect(isUndefined(null)).toBe(false);
});
