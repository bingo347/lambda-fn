export const {assign, freeze} = Object;
export type InferTag<Tagger extends (entity: any) => any> = ReturnType<Tagger> extends {$: infer T} ? T : never;
export function makeTag<Tag extends string>(tag: Tag) {
    return assign(
        <T>(entity: T): T & {$: Tag} => freeze(assign(entity, {$: tag, toString})),
        {$: (v: any) => v && v.$ === tag}
    );
}

export const get = <T extends {v: any}>(container: T): T['v'] => container.v;

function toString(this: {$: string; v?: unknown}) {
    const {$, v} = this; // eslint-disable-line fp/no-this
    return v ? `${$}( ${v} )` : $;
}