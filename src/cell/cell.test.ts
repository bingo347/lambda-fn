// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('@lambda-fn/type-guards', () => require('../type-guards'), {virtual: true});

import {Cell} from './cell';

test('isCell', () => {
    const guard = (v: unknown): v is 1 => v === 1;
    const cell0 = Cell(0);
    const cell1 = Cell(1);

    expect(Cell.isCell(cell0)).toBe(true);
    expect(Cell.isCell(cell1)).toBe(true);
    expect(Cell.isCell({})).toBe(false);

    expect(Cell.isCellWith(guard, cell0)).toBe(false);
    expect(Cell.isCellWith(guard, cell1)).toBe(true);
});

test('cell.value as get/set', () => {
    const cell = Cell(0);
    expect(cell.value).toBe(0);

    cell.set(1);
    expect(cell.value).toBe(1);

    cell.value = -1;
    expect(cell.get()).toBe(-1);
});

// eslint-disable-next-line max-lines-per-function
test('cell.subscribe', () => {
    const fn = jest.fn<void, [number]>();
    const cell = Cell(1);

    const unsubscribe = cell.subscribe(fn);
    expect(fn).toBeCalledTimes(1);
    expect(fn).toBeCalledWith(1);

    cell.set(2);
    expect(fn).toBeCalledTimes(2);
    expect(fn).toBeCalledWith(2);

    cell.set(2);
    expect(fn).toBeCalledTimes(2);

    cell.update(v => v + 1);
    expect(fn).toBeCalledTimes(3);
    expect(fn).toBeCalledWith(3);

    cell.value++;
    expect(fn).toBeCalledTimes(4);
    expect(fn).toBeCalledWith(4);

    unsubscribe();
    cell.set(0);
    expect(fn).toBeCalledTimes(4);
    expect(fn).toBeCalledWith(4);
});

test('similar cells are deep equal', () => {
    expect(Cell({x: 0})).toStrictEqual(Cell({x: 0}));
});
