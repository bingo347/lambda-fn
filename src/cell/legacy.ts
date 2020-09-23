import {Cell} from './cell';

/** @deprecated use Cell */
export const makeCell = <T>(initialValue: T) => Cell(initialValue);