import {Some, None, Option, taggerSome, taggerNone} from './types';

export const some = <T>(value: T): Some<T> => taggerSome({v: value});
export const none: None = taggerNone({});
export {Some, None, Option};

export * from './guards';
export * from './operators';