@lambda-fn/basis

# @lambda-fn/basis

## Table of contents

### Enumerations

- [OptionalKind](enums/OptionalKind.md)
- [ResultingKind](enums/ResultingKind.md)

### Classes

- [Optional](classes/Optional.md)
- [Resulting](classes/Resulting.md)

### Interfaces

- [ApplicativeFunctor](interfaces/ApplicativeFunctor.md)
- [Functor](interfaces/Functor.md)
- [Monad](interfaces/Monad.md)
- [MonadOf](interfaces/MonadOf.md)

### Type aliases

- [AbstractConstructor](README.md#abstractconstructor)
- [AnyAbstractConstructor](README.md#anyabstractconstructor)
- [AnyConstructor](README.md#anyconstructor)
- [AnyFn](README.md#anyfn)
- [AsBoolean](README.md#asboolean)
- [AsFactory](README.md#asfactory)
- [AsFunction](README.md#asfunction)
- [AsString](README.md#asstring)
- [Conditional](README.md#conditional)
- [Constructor](README.md#constructor)
- [Equal](README.md#equal)
- [Falsy](README.md#falsy)
- [Fn](README.md#fn)
- [Keys](README.md#keys)
- [LiteralBase](README.md#literalbase)
- [LiteralUnion](README.md#literalunion)
- [NRecord](README.md#nrecord)
- [Opaque](README.md#opaque)
- [Primitive](README.md#primitive)
- [Recalculate](README.md#recalculate)
- [SRecord](README.md#srecord)
- [SelectByKeyValue](README.md#selectbykeyvalue)
- [SelectivePartial](README.md#selectivepartial)
- [SelectiveRequired](README.md#selectiverequired)
- [StrongBigint](README.md#strongbigint)
- [StrongBoolean](README.md#strongboolean)
- [StrongNumber](README.md#strongnumber)
- [StrongPropertyDescriptor](README.md#strongpropertydescriptor)
- [StrongPropertyDescriptorMap](README.md#strongpropertydescriptormap)
- [StrongString](README.md#strongstring)
- [URecord](README.md#urecord)
- [UnboundFn](README.md#unboundfn)
- [UnboundVoidFn](README.md#unboundvoidfn)
- [UnionToIntersection](README.md#uniontointersection)
- [VoidFn](README.md#voidfn)

### Functions

- [False](README.md#false)
- [Opaque](README.md#opaque)
- [True](README.md#true)
- [asBoolean](README.md#asboolean)
- [asFactory](README.md#asfactory)
- [asFunction](README.md#asfunction)
- [asString](README.md#asstring)
- [assert](README.md#assert)
- [assign](README.md#assign)
- [bind](README.md#bind)
- [contextify](README.md#contextify)
- [create](README.md#create)
- [defineProperties](README.md#defineproperties)
- [defineProperty](README.md#defineproperty)
- [identity](README.md#identity)
- [keys](README.md#keys)
- [noop](README.md#noop)
- [panic](README.md#panic)
- [partial](README.md#partial)
- [set](README.md#set)

## Type aliases

### AbstractConstructor

Ƭ **AbstractConstructor**<`I`, `Args`\>: (...`args`: `Args`) => `I`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | `I` |
| `Args` | extends `unknown`[] |

#### Type declaration

• (...`args`)

Helper for create abstract constructor signatures

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `Args` |

___

### AnyAbstractConstructor

Ƭ **AnyAbstractConstructor**<`I`\>: (...`args`: `any`[]) => `I`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | `any` |

#### Type declaration

• (...`args`)

Helper for create abstract constructor type predicates

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

___

### AnyConstructor

Ƭ **AnyConstructor**<`I`\>: (...`args`: `any`[]) => `I`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | `any` |

#### Type declaration

• (...`args`)

Helper for create constructor type predicates

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

___

### AnyFn

Ƭ **AnyFn**<`R`\>: (...`args`: `any`[]) => `R`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `any` |

#### Type declaration

▸ (...`args`): `R`

Helper for create function type predicates

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `any`[] |

##### Returns

`R`

___

### AsBoolean

Ƭ **AsBoolean**<`T`\>: `T` extends [`Falsy`](README.md#falsy) ? ``false`` : ``true``

Transform any input type to true or false representation

#### Type parameters

| Name |
| :------ |
| `T` |

___

### AsFactory

Ƭ **AsFactory**<`I`, `C`\>: [`UnboundFn`](README.md#unboundfn)<`I`, `ConstructorParameters`<`C`\>\>

Transforms constructor signature to function signature

#### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | `I` |
| `C` | extends [`AnyConstructor`](README.md#anyconstructor)<`I`\> |

___

### AsFunction

Ƭ **AsFunction**<`T`\>: () => `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (): `T`

Function representation of any type

##### Returns

`T`

___

### AsString

Ƭ **AsString**<`T`, `Default`\>: `T` extends `Exclude`<[`Primitive`](README.md#primitive), `symbol`\> ? \`${T}\` : `T` extends {} ? `Strong`<`S`, `string`, `Default`\> : `Default`

String representation of any type

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `Default` | extends `string` = `string` |

___

### Conditional

Ƭ **Conditional**<`Condition`, `TrueType`, `FalseType`\>: `Condition` extends ``true`` ? `TrueType` : `FalseType`

Checks condition is strongly true type

**`returns`** 2nd parameter if 1st parameter is true or 3rd parameter otherwise

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Condition` | extends `boolean` |
| `TrueType` | `TrueType` |
| `FalseType` | `never` |

___

### Constructor

Ƭ **Constructor**<`I`, `Args`\>: (...`args`: `Args`) => `I`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | `I` |
| `Args` | extends `unknown`[] |

#### Type declaration

• (...`args`)

Helper for create constructor signatures

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `Args` |

___

### Equal

Ƭ **Equal**<`A`, `B`\>: `A` extends `B` ? `B` extends `A` ? ``true`` : ``false`` : ``false``

Checks two types are representation of the some type

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

___

### Falsy

Ƭ **Falsy**: ``false`` \| ``0`` \| `0n` \| ``null`` \| `undefined` \| ``""``

May contains all possible falsy values \
Notice: NaN is falsy value but hasn't literal type and not included in this type

___

### Fn

Ƭ **Fn**<`R`, `Args`, `This`\>: `unknown` extends `This` ? (...`args`: `Args`) => `R` : (`this`: `This`, ...`args`: `Args`) => `R`

Helper for create function signatures

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `Args` | extends `unknown`[] |
| `This` | `unknown` |

___

### Keys

Ƭ **Keys**<`T`\>: [`AsString`](README.md#asstring)<`Exclude`<keyof `T`, `symbol`\>\>[]

Strong variant of `keyof` operator

#### Type parameters

| Name |
| :------ |
| `T` |

___

### LiteralBase

Ƭ **LiteralBase**<`Literal`\>: { [K in keyof PrimitiveMap]: Literal extends PrimitiveMap[K] ? PrimitiveMap[K] : never }[keyof `PrimitiveMap`]

Get base type from literal type

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Literal` | extends [`Primitive`](README.md#primitive) |

___

### LiteralUnion

Ƭ **LiteralUnion**<`Literals`, `Basis`\>: `Literals` \| `Basis` & {}

Create primitive type with IDE autocompletion for most used literals

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Literals` | `Literals` |
| `Basis` | extends [`Primitive`](README.md#primitive) = [`LiteralBase`](README.md#literalbase)<`Literals` & [`Primitive`](README.md#primitive)\> |

___

### NRecord

Ƭ **NRecord**<`T`\>: `Record`<`number`, `T`\>

Shorthand for Record with number keys

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

___

### Opaque

Ƭ **Opaque**<`T`, `Tag`\>: `T` & {}

#### Type parameters

| Name |
| :------ |
| `T` |
| `Tag` |

___

### Primitive

Ƭ **Primitive**: `PrimitiveMap`[keyof `PrimitiveMap`]

Shorthand for all primitive types union

___

### Recalculate

Ƭ **Recalculate**<`T`\>: `T` extends `unknown` ? { [K in keyof T]: T[K] } : `never`

Recalculates type to simple representation

#### Type parameters

| Name |
| :------ |
| `T` |

___

### SRecord

Ƭ **SRecord**<`T`\>: `Record`<`string`, `T`\>

Shorthand for Record with string keys

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

___

### SelectByKeyValue

Ƭ **SelectByKeyValue**<`T`, `Key`, `Value`\>: [`Recalculate`](README.md#recalculate)<`T` & { [\_ in Key]: Value }\>

Selects variants of union by key-value pair

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `Key` | extends keyof `T` |
| `Value` | extends `T`[`Key`] |

___

### SelectivePartial

Ƭ **SelectivePartial**<`T`, `K`\>: [`Recalculate`](README.md#recalculate)<`Required`<`Pick`<`T`, `Exclude`<keyof `T`, `K`\>\>\> & `Partial`<`Pick`<`T`, `K`\>\>\>

Makes some keys of type optional

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends keyof `T` |

___

### SelectiveRequired

Ƭ **SelectiveRequired**<`T`, `K`\>: [`Recalculate`](README.md#recalculate)<`Required`<`Pick`<`T`, `K`\>\> & `Partial`<`Pick`<`T`, `Exclude`<keyof `T`, `K`\>\>\>\>

Makes some keys of type required

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends keyof `T` |

___

### StrongBigint

Ƭ **StrongBigint**<`Input`\>: `Strong`<`Input`, `bigint`, `0n`\>

Checks input type is bigint

**`returns`** input type if it is bigint or 0n otherwise

#### Type parameters

| Name |
| :------ |
| `Input` |

___

### StrongBoolean

Ƭ **StrongBoolean**<`Input`\>: `Strong`<`Input`, `boolean`, ``false``\>

Checks input type is boolean

**`returns`** input type if it is boolean or false otherwise

#### Type parameters

| Name |
| :------ |
| `Input` |

___

### StrongNumber

Ƭ **StrongNumber**<`Input`\>: `Strong`<`Input`, `number`, ``0``\>

Checks input type is number

**`returns`** input type if it is number or 0 otherwise

#### Type parameters

| Name |
| :------ |
| `Input` |

___

### StrongPropertyDescriptor

Ƭ **StrongPropertyDescriptor**<`T`, `K`\>: {} \| {} \| {}

Strong variant of PropertyDescriptor

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends keyof `T` |

___

### StrongPropertyDescriptorMap

Ƭ **StrongPropertyDescriptorMap**<`T`\>: { [K in keyof T]?: StrongPropertyDescriptor<T, K\> }

Strong variant of PropertyDescriptorMap

#### Type parameters

| Name |
| :------ |
| `T` |

___

### StrongString

Ƭ **StrongString**<`Input`\>: `Strong`<`Input`, `string`, [`AsString`](README.md#asstring)<`Input`, ``""``\>\>

Checks input type is string

**`returns`** input type if it is string or '' otherwise

#### Type parameters

| Name |
| :------ |
| `Input` |

___

### URecord

Ƭ **URecord**<`T`\>: `Record`<`PropertyKey`, `T`\>

Shorthand for Record with any possible keys

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `unknown` |

___

### UnboundFn

Ƭ **UnboundFn**<`R`, `Args`\>: [`Fn`](README.md#fn)<`R`, `Args`, `void`\>

Helper for create unbound `(this: void)` function signatures

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `Args` | extends `unknown`[] |

___

### UnboundVoidFn

Ƭ **UnboundVoidFn**<`Args`\>: [`Fn`](README.md#fn)<`void`, `Args`, `void`\>

Helper for create unbound `(this: void)` function signatures that returns void

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Args` | extends `unknown`[] |

___

### UnionToIntersection

Ƭ **UnionToIntersection**<`U`\>: `U` extends `unknown` ? [`Fn`](README.md#fn)<`unknown`, [`U`]\> : `never` extends [`Fn`](README.md#fn)<`unknown`, [infer I]\> ? `I` : `never`

Transforms union of types to intersection of that types

#### Type parameters

| Name |
| :------ |
| `U` |

___

### VoidFn

Ƭ **VoidFn**<`Args`, `This`\>: [`Fn`](README.md#fn)<`void`, `Args`, `This`\>

Helper for create function signatures that returns void

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Args` | extends `unknown`[] |
| `This` | `unknown` |

## Functions

### False

▸ `Const` **False**(): ``false``

Functional representation of false

#### Returns

``false``

always false

___

### Opaque

▸ `Const` **Opaque**<`T`, `Tag`\>(): `OpaqueFactory`<`T`, `Tag`\>

Create wrapper for attach opaque type to value

#### Type parameters

| Name |
| :------ |
| `T` |
| `Tag` |

#### Returns

`OpaqueFactory`<`T`, `Tag`\>

___

### True

▸ `Const` **True**(): ``true``

Functional representation of true

#### Returns

``true``

always true

___

### asBoolean

▸ `Const` **asBoolean**<`T`\>(`value`): [`AsBoolean`](README.md#asboolean)<`T`\>

Transform any value to boolean representation with strong types \
Notice: for NaN it returns false with type true

**`see`** [Falsy](README.md#falsy)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | Any value to transform |

#### Returns

[`AsBoolean`](README.md#asboolean)<`T`\>

true of false

___

### asFactory

▸ `Const` **asFactory**<`I`, `C`\>(`constructor`): [`AsFactory`](README.md#asfactory)<`I`, `C`\>

Transforms constructor to factory

**`example`**
```typescript
class A {}
const createA = asFactory(A);
// Valid and returns instance of A
const a = createA();
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | `I` |
| `C` | extends [`AnyConstructor`](README.md#anyconstructor)<`I`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `constructor` | `C` | Any non abstract constructor |

#### Returns

[`AsFactory`](README.md#asfactory)<`I`, `C`\>

Function with some params but callable without new operator

___

### asFunction

▸ `Const` **asFunction**<`T`\>(`value`): [`AsFunction`](README.md#asfunction)<`T`\>

Transforms any value to function that always returns this value

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

[`AsFunction`](README.md#asfunction)<`T`\>

___

### asString

▸ `Const` **asString**<`T`\>(`value`): [`AsString`](README.md#asstring)<`T`, `string`\>

Convert any value to string representation with strong types

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

[`AsString`](README.md#asstring)<`T`, `string`\>

___

### assert

▸ `Const` **assert**(`condition`, `message`, `errorConstructor?`): asserts condition

Asserts condition is true

**`throws`** Error if condition is false

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `condition` | `boolean` | Condition |
| `message` | `string` | - |
| `errorConstructor?` | `ErrorConstructor` | - |

#### Returns

asserts condition

▸ `Const` **assert**(`condition`, `error`): asserts condition

Asserts condition is true

**`throws`** Error if condition is false

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `condition` | `boolean` | Condition |
| `error` | `Error` | - |

#### Returns

asserts condition

___

### assign

▸ `Const` **assign**<`Target`, `Sources`\>(`target`, ...`sources`): [`UnionToIntersection`](README.md#uniontointersection)<`Target` \| `Sources`[`number`]\>

`Object.assign` with strong types

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Target` | `Target` |
| `Sources` | extends [`URecord`](README.md#urecord)<`unknown`\>[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `Target` |
| `...sources` | `Sources` |

#### Returns

[`UnionToIntersection`](README.md#uniontointersection)<`Target` \| `Sources`[`number`]\>

___

### bind

▸ `Const` **bind**<`R`, `Args`, `This`\>(`f`, `thisArg`): (...`args`: `Args`) => `R`

Wrap function to unbounded variant

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `Args` | extends `unknown`[] |
| `This` | `This` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | [`Fn`](README.md#fn)<`R`, `Args`, `This`\> | Any function |
| `thisArg` | `This` | Context (`this`) for function `f` |

#### Returns

`fn`

Unbounded function

▸ (...`args`): `R`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `Args` |

##### Returns

`R`

___

### contextify

▸ `Const` **contextify**<`R`, `Args`, `This`\>(`f`): [`Fn`](README.md#fn)<`R`, `Args`, `This`\>

Wrap function to bounded variant

**`example`**
```typescript
const originalMethod = SomeClass.prototype.method;
SomeClass.prototype.method = contextify((self: SomeClass, arg: string) => {
    // ... some patch ...
    return originalMethod.call(self, arg);
});
```

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `Args` | extends `unknown`[] |
| `This` | `This` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (...`args`: [`This`, ...Args[]]) => `R` | Any function |

#### Returns

[`Fn`](README.md#fn)<`R`, `Args`, `This`\>

Function that calls original function with this as 1st argument

___

### create

▸ `Const` **create**<`I`, `C`\>(`constructor`, ...`args`): `I`

Helper for create instance from constructor

#### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | `I` |
| `C` | extends [`AnyConstructor`](README.md#anyconstructor)<`I`\> |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `constructor` | `C` | Any non abstract constructor |
| `...args` | `ConstructorParameters`<`C`\> | constructor arguments |

#### Returns

`I`

created instance

___

### defineProperties

▸ `Const` **defineProperties**<`T`\>(`target`, `properties`): `T`

`Object.defineProperties` with strong types

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `T` |
| `properties` | [`StrongPropertyDescriptorMap`](README.md#strongpropertydescriptormap)<`T`\> |

#### Returns

`T`

___

### defineProperty

▸ `Const` **defineProperty**<`T`, `K`\>(`target`, `property`, `descriptor`): `T`

`Object.defineProperty` with strong types

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `K` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `T` |
| `property` | `K` |
| `descriptor` | [`StrongPropertyDescriptor`](README.md#strongpropertydescriptor)<`T`, `K`\> |

#### Returns

`T`

___

### identity

▸ `Const` **identity**<`T`\>(`value`): `T`

Returns argument

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`T`

___

### keys

▸ `Const` **keys**<`T`\>(`target`, `includeNonEnumerable?`): [`Keys`](README.md#keys)<`T`\>

`Object.keys` / `Object.getOwnPropertyNames` with strong types

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `target` | `T` | `undefined` | Any object |
| `includeNonEnumerable` | `boolean` | `false` | Set it to `true` for include non enumerable keys |

#### Returns

[`Keys`](README.md#keys)<`T`\>

Keys array

___

### noop

▸ `Const` **noop**(): `void`

It's doing nothing

#### Returns

`void`

___

### panic

▸ `Const` **panic**(`message`, `errorConstructor?`): `never`

Shorthand for throw error

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `errorConstructor?` | `ErrorConstructor` |

#### Returns

`never`

▸ `Const` **panic**(`error`): `never`

Shorthand for throw error

#### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |

#### Returns

`never`

___

### partial

▸ `Const` **partial**<`R`, `A1`, `A2`, `This`\>(`f`, ...`args1`): [`Fn`](README.md#fn)<`R`, `A2`, `This`\>

Partial application

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `A1` | extends `unknown`[] |
| `A2` | extends `unknown`[] |
| `This` | `unknown` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | [`Fn`](README.md#fn)<`R`, [...A1[], ...A2[]], `This`\> | Any function |
| `...args1` | `A1` | 1st part of function arguments |

#### Returns

[`Fn`](README.md#fn)<`R`, `A2`, `This`\>

Function with 2nd part of function arguments

___

### set

▸ `Const` **set**<`T`, `K`\>(`target`, `key`, `value`): `T`

Helper for set property to object

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `EmptyObject` |
| `K` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `T` | Any object |
| `key` | `K` | Object property key |
| `value` | `T`[`K`] | Property value |

#### Returns

`T`

target
