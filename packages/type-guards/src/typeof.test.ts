import {
    isString,
    isSymbol,
    isUndefined,
} from './typeof';

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
