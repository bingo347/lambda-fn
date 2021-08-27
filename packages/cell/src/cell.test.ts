import {Cell, patch} from './cell';

test('isCell', () => {
    const guard = (v: unknown): v is 1 =>
        v === 1;
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

test('cell.subscribe', () => {
    const fn = jest.fn<undefined, [number]>();
    const cell = Cell(1);

    const unsubscribe = cell.subscribe(fn);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1);

    cell.set(2);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenCalledWith(2);

    cell.set(2);
    expect(fn).toHaveBeenCalledTimes(2);

    const t3 = 3;
    cell.update(v =>
        v + 1);
    expect(fn).toHaveBeenCalledTimes(t3);
    expect(fn).toHaveBeenCalledWith(t3);

    cell.value++;
    expect(fn).toHaveBeenCalledTimes(4);
    expect(fn).toHaveBeenCalledWith(4);

    unsubscribe();
    cell.set(0);
    expect(fn).toHaveBeenCalledTimes(4);
    expect(fn).toHaveBeenCalledWith(4);
});

test('similar cells are deep equal', () => {
    expect(Cell({x: 0})).toStrictEqual(Cell({x: 0}));
});

test('patch can add new method to cell', () => {
    patch((get, set) =>
        // @ts-expect-error: unsafe extension
        ({
            incr: () =>
                set((get() as unknown as number + 1) as unknown as ReturnType<typeof get>),
        }));
    const cell = Cell(0) as Cell<number> & {incr(): void};

    expect(typeof cell.incr).toBe('function');

    cell.incr();
    expect(cell.value).toBe(1);
});
