@lambda-fn/type-guards

# @lambda-fn/type-guards

## Table of contents

### Type aliases

- [TypeGuard](README.md#typeguard)

### Functions

- [isArray](README.md#isarray)
- [isArrayBuffer](README.md#isarraybuffer)
- [isArrayWith](README.md#isarraywith)
- [isBigInt](README.md#isbigint)
- [isBigInt64Array](README.md#isbigint64array)
- [isBigUint64Array](README.md#isbiguint64array)
- [isBoolean](README.md#isboolean)
- [isConstructor](README.md#isconstructor)
- [isDataView](README.md#isdataview)
- [isDate](README.md#isdate)
- [isEqualTo](README.md#isequalto)
- [isError](README.md#iserror)
- [isFloat32Array](README.md#isfloat32array)
- [isFloat64Array](README.md#isfloat64array)
- [isFunction](README.md#isfunction)
- [isInt16Array](README.md#isint16array)
- [isInt32Array](README.md#isint32array)
- [isInt8Array](README.md#isint8array)
- [isIterable](README.md#isiterable)
- [isIterableWith](README.md#isiterablewith)
- [isMap](README.md#ismap)
- [isMapWith](README.md#ismapwith)
- [isNonNullable](README.md#isnonnullable)
- [isNull](README.md#isnull)
- [isNullable](README.md#isnullable)
- [isNumber](README.md#isnumber)
- [isObject](README.md#isobject)
- [isObjectLike](README.md#isobjectlike)
- [isObjectWithKey](README.md#isobjectwithkey)
- [isPrimitive](README.md#isprimitive)
- [isPromise](README.md#ispromise)
- [isPromiseLike](README.md#ispromiselike)
- [isPropertyKey](README.md#ispropertykey)
- [isRegExp](README.md#isregexp)
- [isSet](README.md#isset)
- [isSetWith](README.md#issetwith)
- [isString](README.md#isstring)
- [isSymbol](README.md#issymbol)
- [isTypedArray](README.md#istypedarray)
- [isUint16Array](README.md#isuint16array)
- [isUint32Array](README.md#isuint32array)
- [isUint8Array](README.md#isuint8array)
- [isUndefined](README.md#isundefined)
- [makeInstanceofGuard](README.md#makeinstanceofguard)

## Type aliases

### TypeGuard

Ƭ **TypeGuard**<`T`, `V`, `Args`\>: (`v`: `V`, ...`args`: `Args`) => v is T

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `V` |
| `V` | `unknown` |
| `Args` | extends `unknown`[] = [] |

#### Type declaration

▸ (`v`, ...`args`): v is T

Shorthand for guard signature

##### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `V` |
| `...args` | `Args` |

##### Returns

v is T

## Functions

### isArray

▸ **isArray**(`v`): v is unknown[]

Guard for Array type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is unknown[]

___

### isArrayBuffer

▸ **isArrayBuffer**(`v`): v is ArrayBuffer

Guard for ArrayBuffer type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is ArrayBuffer

___

### isArrayWith

▸ **isArrayWith**<`T`\>(`guard`, `v`): v is T[]

Guard for Array type with concrete contents

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `guard` | [`TypeGuard`](README.md#typeguard)<`T`, `unknown`, []\> | Contents guard |
| `v` | `unknown` | - |

#### Returns

v is T[]

___

### isBigInt

▸ **isBigInt**(`v`): v is bigint

Guard for bigint type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is bigint

___

### isBigInt64Array

▸ **isBigInt64Array**(`v`): v is BigInt64Array

Guard for BigInt64Array type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is BigInt64Array

___

### isBigUint64Array

▸ **isBigUint64Array**(`v`): v is BigUint64Array

Guard for BigUint64Array type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is BigUint64Array

___

### isBoolean

▸ **isBoolean**(`v`): v is boolean

Guard for boolean type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is boolean

___

### isConstructor

▸ **isConstructor**(`v`): v is AnyConstructor<unknown\> & AnyFn<unknown\>

Guard for Constructor type (function that possible calls with `new` operator)

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is AnyConstructor<unknown\> & AnyFn<unknown\>

___

### isDataView

▸ **isDataView**(`v`): v is DataView

Guard for DataView type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is DataView

___

### isDate

▸ **isDate**(`v`): v is Date

Guard for Date type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is Date

___

### isEqualTo

▸ **isEqualTo**<`V`\>(`value`): [`TypeGuard`](README.md#typeguard)<`V`, `unknown`, []\>

Guard that checks two primitive values are equal

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | extends `Primitive` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `V` |

#### Returns

[`TypeGuard`](README.md#typeguard)<`V`, `unknown`, []\>

▸ **isEqualTo**<`V`\>(`value`, `v`): v is V

Guard that checks two primitive values are equal

#### Type parameters

| Name | Type |
| :------ | :------ |
| `V` | extends `Primitive` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `V` |
| `v` | `unknown` |

#### Returns

v is V

___

### isError

▸ **isError**(`v`): v is Error

Guard for Error type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is Error

___

### isFloat32Array

▸ **isFloat32Array**(`v`): v is Float32Array

Guard for Float32Array type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is Float32Array

___

### isFloat64Array

▸ **isFloat64Array**(`v`): v is Float64Array

Guard for Float64Array type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is Float64Array

___

### isFunction

▸ **isFunction**(`v`): v is AnyFn<unknown\>

Guard for Function type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is AnyFn<unknown\>

___

### isInt16Array

▸ **isInt16Array**(`v`): v is Int16Array

Guard for Int16Array type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is Int16Array

___

### isInt32Array

▸ **isInt32Array**(`v`): v is Int32Array

Guard for Int32Array type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is Int32Array

___

### isInt8Array

▸ **isInt8Array**(`v`): v is Int8Array

Guard for Int8Array type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is Int8Array

___

### isIterable

▸ **isIterable**(`v`): v is Iterable<unknown\>

Guard for Iterable type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is Iterable<unknown\>

___

### isIterableWith

▸ **isIterableWith**<`T`\>(`guard`, `v`): v is Iterable<T\>

Guard for Iterable type with concrete contents

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `guard` | [`TypeGuard`](README.md#typeguard)<`T`, `unknown`, []\> | Contents guard |
| `v` | `unknown` | - |

#### Returns

v is Iterable<T\>

___

### isMap

▸ **isMap**(`v`): v is Map<unknown, unknown\>

Guard for Map type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is Map<unknown, unknown\>

___

### isMapWith

▸ **isMapWith**<`K`, `V`\>(`guard`, `v`): v is Map<K, V\>

Guard for Map type with concrete contents

#### Type parameters

| Name |
| :------ |
| `K` |
| `V` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `guard` | [`TypeGuard`](README.md#typeguard)<[`K`, `V`], [`unknown`, `unknown`], []\> | Contents guard |
| `v` | `unknown` | - |

#### Returns

v is Map<K, V\>

___

### isNonNullable

▸ **isNonNullable**<`T`\>(`v`): v is NonNullable<T\>

Guard for NonNullable type

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `T` |

#### Returns

v is NonNullable<T\>

___

### isNull

▸ **isNull**(`v`, ...`args`): v is null

Guard for null type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |
| `...args` | [] |

#### Returns

v is null

___

### isNullable

▸ **isNullable**(`v`): v is undefined \| null

Guard for Nullable (`null | undefined`) type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is undefined \| null

___

### isNumber

▸ **isNumber**(`v`): v is number

Guard for number type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is number

___

### isObject

▸ **isObject**(`v`): v is Record<PropertyKey, unknown\>

Guard for non nullable object type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is Record<PropertyKey, unknown\>

___

### isObjectLike

▸ **isObjectLike**(`v`): v is AnyFn<unknown\> \| Record<PropertyKey, unknown\>

Guard for type represents object or function

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is AnyFn<unknown\> \| Record<PropertyKey, unknown\>

___

### isObjectWithKey

▸ **isObjectWithKey**<`K`, `T`\>(`key`, `guard?`): (`v`: `unknown`) => v is Record<K, T\>

Create guard that checks value is object with concrete key & value

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `PropertyKey` |
| `T` | `T` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `key` | `K` | `undefined` | Key that will be checked |
| `guard` | [`TypeGuard`](README.md#typeguard)<`T`, `unknown`, []\> | `defaultGuard` | Guard for property value |

#### Returns

`fn`

Guard

▸ (`v`): v is Record<K, T\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

##### Returns

v is Record<K, T\>

___

### isPrimitive

▸ **isPrimitive**(`v`): v is Primitive

Guard for Primitive (`string | number | bigint | boolean | symbol | null | undefined`) type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is Primitive

___

### isPromise

▸ **isPromise**(`v`): v is Promise<unknown\>

Guard for Promise type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is Promise<unknown\>

___

### isPromiseLike

▸ **isPromiseLike**(`v`, ...`args`): v is PromiseLike<unknown\>

Guard for PromiseLike type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |
| `...args` | [] |

#### Returns

v is PromiseLike<unknown\>

___

### isPropertyKey

▸ **isPropertyKey**(`v`): v is PropertyKey

Guard for PropertyKey (`string | number | symbol`) type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is PropertyKey

___

### isRegExp

▸ **isRegExp**(`v`): v is RegExp

Guard for RegExp type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is RegExp

___

### isSet

▸ **isSet**(`v`): v is Set<unknown\>

Guard for Set type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is Set<unknown\>

___

### isSetWith

▸ **isSetWith**<`T`\>(`guard`, `v`): v is Set<T\>

Guard for Set type with concrete contents

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `guard` | [`TypeGuard`](README.md#typeguard)<`T`, `unknown`, []\> | Contents guard |
| `v` | `unknown` | - |

#### Returns

v is Set<T\>

___

### isString

▸ **isString**(`v`): v is string

Guard for string type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is string

___

### isSymbol

▸ **isSymbol**(`v`): v is symbol

Guard for symbol type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is symbol

___

### isTypedArray

▸ **isTypedArray**(`v`): v is TypedArray

Guard for TypedArray type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is TypedArray

___

### isUint16Array

▸ **isUint16Array**(`v`): v is Uint16Array

Guard for Uint16Array type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is Uint16Array

___

### isUint32Array

▸ **isUint32Array**(`v`): v is Uint32Array

Guard for Uint32Array type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is Uint32Array

___

### isUint8Array

▸ **isUint8Array**(`v`): v is Uint8Array

Guard for Uint8Array type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is Uint8Array

___

### isUndefined

▸ **isUndefined**(`v`): v is undefined

Guard for undefined type

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

#### Returns

v is undefined

___

### makeInstanceofGuard

▸ **makeInstanceofGuard**<`C`\>(`constructor`): (`v`: `unknown`) => v is InstanceType<C\>

Creates instance guard from constructor

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `AnyAbstractConstructor`<`any`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `constructor` | `C` | Constructor that instances guard will check |

#### Returns

`fn`

Guard that checks instances

▸ (`v`): v is InstanceType<C\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `unknown` |

##### Returns

v is InstanceType<C\>
