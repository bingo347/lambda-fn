import {Result, Ok, Err} from './result';
import {impl} from './internal';
import type {Mapper} from '../_util';

const cloneOk = <T>(value: T) => () => Ok(value);
const cloneErr = <E>(error: E) => () => Err(error);

export const clone = <T, E>(result: Result<T, E>): Result<T, E> => result.clone();
impl('clone', cloneOk, cloneErr, false);

export const andThen = <T, E, R>(f: Mapper<T, Result<R, E>>) => (result: Result<T, E>): Result<R, E> => result.andThen(f);
impl('andThen', (value => f => f(value)), cloneErr, false);

export const orElse = <T, E, O>(f: Mapper<E, Result<T, O>>) => (result: Result<T, E>): Result<T, O> => result.orElse(f);
impl('orElse', cloneOk, (error => f => f(error)), false);

export const map = <T, R>(mapper: Mapper<T, R>) => <E>(result: Result<T, E>): Result<R, E> => result.map(mapper);
impl('map', (value => mapper => Ok(mapper(value))), cloneErr, false);

export const mapErr = <E, R>(mapper: Mapper<E, R>) => <T>(result: Result<T, E>): Result<T, R> => result.mapErr(mapper);
impl('mapErr', cloneOk, (error => mapper => Err(mapper(error))), false);

const retOther = () => <T>(other: T) => other;
impl('and', retOther, cloneErr, false);
impl('or', cloneOk, retOther, false);
