import {isUndefined} from './typeof';
import type {TypeGuard} from './types';

/** @deprecated use isUndefined */
export const isVoid = isUndefined as TypeGuard<void>;
