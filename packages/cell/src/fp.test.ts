import {Cell} from './cell';
import {get, set, update, subscribe, clone, map, fold} from './fp';

test('`get` returns cell value', () => {
    expect(get(Cell(1))).toBe(1);
});

test('`set` sets value to cell', () => {
    const cell = Cell(0);
    expect(cell.value).toBe(0);
    set(cell, 10);
    expect(cell.value).toBe(10);
});

test('`update` update value in cell', () => {
    const cell = Cell(5);
    expect(cell.value).toBe(5);
    update(cell, v => v ** 2);
    expect(cell.value).toBe(25);
});

test('`subscribe` work correct', () => {
    const fn = jest.fn<void, [number]>();
    const cell = Cell(1);

    const unsubscribe = subscribe(cell, fn);
    expect(fn).toBeCalledTimes(1);
    expect(fn).toBeCalledWith(1);

    set(cell, 2);
    expect(fn).toBeCalledTimes(2);
    expect(fn).toBeCalledWith(2);

    unsubscribe();
    set(cell, 0);
    expect(fn).toBeCalledTimes(2);
    expect(fn).toBeCalledWith(2);
});

test('`clone` make new cell what is deep equal to original cell', () => {
    const cell = Cell(1);
    const clonedCell = clone(cell);
    expect(clonedCell).not.toBe(cell);
    expect(clonedCell).toEqual(cell);
});

test('`map` make new cell with value transformed by mapper', () => {
    const fn = jest.fn((v: number) => v + 1);
    const cell = Cell(1);
    const mappedCell = map(cell, fn);
    const partialMap = map(fn);

    expect(cell.value).toBe(1);

    expect(mappedCell.value).toBe(2);
    expect(fn).toBeCalledTimes(1);

    fn.mockClear();

    expect(partialMap(cell).value).toBe(2);
    expect(fn).toBeCalledTimes(1);
});

test('`fold` returns value transformed by mapper', () => {
    const fn = jest.fn((v: number) => v + 1);
    const cell = Cell(1);
    const foldedValue = fold(cell, fn);
    const partialFold = fold(fn);

    expect(cell.value).toBe(1);

    expect(foldedValue).toBe(2);
    expect(fn).toBeCalledTimes(1);

    fn.mockClear();

    expect(partialFold(cell)).toBe(2);
    expect(fn).toBeCalledTimes(1);
});
