[@lambda-fn/basis](../README.md) / Resulting

# Class: Resulting<O, E\>

Base class for resulting values

## Type parameters

| Name |
| :------ |
| `O` |
| `E` |

## Implements

- [`Monad`](../interfaces/Monad.md)<`O`\>

## Table of contents

### Constructors

- [constructor](Resulting.md#constructor)

### Methods

- [andThen](Resulting.md#andthen)
- [apply](Resulting.md#apply)
- [expect](Resulting.md#expect)
- [map](Resulting.md#map)
- [unwrap](Resulting.md#unwrap)
- [of](Resulting.md#of)

## Constructors

### constructor

• **new Resulting**<`O`, `E`\>(`Kind`, `error`)

#### Type parameters

| Name |
| :------ |
| `O` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `Kind` | [`Err`](../enums/ResultingKind.md#err) |
| `error` | `E` |

• **new Resulting**<`O`, `E`\>(`kind`, `value`)

#### Type parameters

| Name |
| :------ |
| `O` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `kind` | [`Ok`](../enums/ResultingKind.md#ok) |
| `value` | `O` |

## Methods

### andThen

▸ **andThen**<`R`\>(`f`): [`Resulting`](Resulting.md)<`R`, `E`\>

Chains inner value to another [Resulting](Resulting.md)

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (...`args`: [value: O]) => [`Resulting`](Resulting.md)<`R`, `E`\> | Transformer for value |

#### Returns

[`Resulting`](Resulting.md)<`R`, `E`\>

New [Resulting](Resulting.md) with chained value

#### Implementation of

Monad.andThen

___

### apply

▸ **apply**<`V`, `R`, `TE`\>(`target`): [`Resulting`](Resulting.md)<`R`, `E` \| `TE`\>

If this [Resulting](Resulting.md) contains `Ok(function)` then map target [Resulting](Resulting.md) with it

#### Type parameters

| Name |
| :------ |
| `V` |
| `R` |
| `TE` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | [`Resulting`](Resulting.md)<`V`, `TE`\> | Target [Resulting](Resulting.md) for transformation |

#### Returns

[`Resulting`](Resulting.md)<`R`, `E` \| `TE`\>

New [Resulting](Resulting.md) with transformed value

#### Implementation of

Monad.apply

___

### expect

▸ **expect**(`message`): `O`

Extract raw value from [Resulting](Resulting.md)

**`throws`** TypeError if [Resulting](Resulting.md) is Err

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` | Message for TypeError |

#### Returns

`O`

Raw value

___

### map

▸ **map**<`R`\>(`f`): [`Resulting`](Resulting.md)<`R`, `E`\>

Transforms inner value

#### Type parameters

| Name |
| :------ |
| `R` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (...`args`: [value: O]) => `R` | Transformer for value |

#### Returns

[`Resulting`](Resulting.md)<`R`, `E`\>

New [Resulting](Resulting.md) with transformed value

#### Implementation of

Monad.map

___

### unwrap

▸ **unwrap**(): `O`

Extract raw value from [Resulting](Resulting.md)

**`throws`** TypeError if [Resulting](Resulting.md) is Err

#### Returns

`O`

Raw value

#### Implementation of

Monad.unwrap

___

### of

▸ `Static` **of**<`V`\>(`value`): [`Resulting`](Resulting.md)<`V`, `unknown`\>

Wrap value into [Resulting](Resulting.md)

#### Type parameters

| Name |
| :------ |
| `V` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `V` | Value |

#### Returns

[`Resulting`](Resulting.md)<`V`, `unknown`\>

Ok representation of value
