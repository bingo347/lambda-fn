[@lambda-fn/basis](../README.md) / Optional

# Class: Optional<T\>

Base class for optional values

## Type parameters

| Name |
| :------ |
| `T` |

## Implements

- [`Monad`](../interfaces/Monad.md)<`T`\>

## Table of contents

### Constructors

- [constructor](Optional.md#constructor)

### Properties

- [None](Optional.md#none)

### Methods

- [andThen](Optional.md#andthen)
- [apply](Optional.md#apply)
- [expect](Optional.md#expect)
- [map](Optional.md#map)
- [unwrap](Optional.md#unwrap)
- [of](Optional.md#of)

## Constructors

### constructor

• **new Optional**<`T`\>(`kind`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `kind` | [`None`](../enums/OptionalKind.md#none) |

• **new Optional**<`T`\>(`Kind`, `value`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Kind` | [`Some`](../enums/OptionalKind.md#some) |
| `value` | `T` |

## Properties

### None

▪ `Static` `Readonly` **None**: [`Optional`](Optional.md)<`never`\>

None instance of [Optional](Optional.md)

## Methods

### andThen

▸ **andThen**<`R`\>(`f`): [`Optional`](Optional.md)<`R`\>

Chains inner value to another [Optional](Optional.md)

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (...`args`: [value: T]) => [`Optional`](Optional.md)<`R`\> | Transformer for value |

#### Returns

[`Optional`](Optional.md)<`R`\>

New [Optional](Optional.md) with chained value

#### Implementation of

Monad.andThen

___

### apply

▸ **apply**<`V`, `R`\>(`target`): [`Optional`](Optional.md)<`R`\>

If this [Optional](Optional.md) contains `Some(function)` then map target [Optional](Optional.md) with it

#### Type parameters

| Name |
| :------ |
| `V` |
| `R` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | [`Optional`](Optional.md)<`V`\> | Target [Optional](Optional.md) for transformation |

#### Returns

[`Optional`](Optional.md)<`R`\>

New [Optional](Optional.md) with transformed value

#### Implementation of

Monad.apply

___

### expect

▸ **expect**(`message`): `T`

Extract raw value from [Optional](Optional.md)

**`throws`** TypeError if [Optional](Optional.md) is None

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | Message for TypeError |

#### Returns

`T`

Raw value

___

### map

▸ **map**<`R`\>(`f`): [`Optional`](Optional.md)<`R`\>

Transforms inner value

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (...`args`: [value: T]) => `R` | Transformer for value |

#### Returns

[`Optional`](Optional.md)<`R`\>

New [Optional](Optional.md) with transformed value

#### Implementation of

Monad.map

___

### unwrap

▸ **unwrap**(): `T`

Extract raw value from [Optional](Optional.md)

**`throws`** TypeError if [Optional](Optional.md) is None

#### Returns

`T`

Raw value

#### Implementation of

Monad.unwrap

___

### of

▸ `Static` **of**(`value`): [`Optional`](Optional.md)<`never`\>

Wrap value into [Optional](Optional.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `undefined` \| ``null`` | Value |

#### Returns

[`Optional`](Optional.md)<`never`\>

Some representation if value is non nullable or Optional.None

▸ `Static` **of**<`V`\>(`value`): [`Optional`](Optional.md)<`NonNullable`<`V`\>\>

Wrap value into [Optional](Optional.md)

#### Type parameters

| Name |
| :------ |
| `V` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `V` | Value |

#### Returns

[`Optional`](Optional.md)<`NonNullable`<`V`\>\>

Some representation if value is non nullable or Optional.None
