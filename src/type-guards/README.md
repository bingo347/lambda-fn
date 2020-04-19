# @lambda-fn/type-guards

Type guards for basic javascript types

## Install

```bash
npm install --save @lambda-fn/type-guards
# or
yarn add @lambda-fn/type-guards
```

## Exports

```typescript
function isUndefined(v: unknown): v is undefined;
function isVoid(v: unknown): v is void;
function isBoolean(v: unknown): v is boolean;
function isString(v: unknown): v is string;
function isNumber(v: unknown): v is number;
function isBigInt(v: unknown): v is bigint;
function isSymbol(v: unknown): v is symbol;
function isObject(v: unknown): v is Record<string | number | symbol, unknown>;
function isFunction(v: unknown): v is (...args: unknown[]) => unknown;
```

## License

MIT
