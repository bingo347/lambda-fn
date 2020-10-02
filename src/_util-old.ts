export const {assign, freeze} = Object;
export type InferTag<Tagger extends (entity: any) => any> = ReturnType<Tagger> extends {$: infer T} ? T : never;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function makeTag<Tag extends string>(tag: Tag) {
    return assign(
        <T>(entity: T): T & {$: Tag} => freeze(assign(entity, {$: tag, toString})),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        {$: (v: any) => v && v.$ === tag}
    );
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const get = <T extends {v: any}>(container: T): T['v'] => container.v;

function toString(this: {$: string; v?: unknown}) {
    const {$, v} = this;
    return v ? `${$}( ${String(v)} )` : $;
}
