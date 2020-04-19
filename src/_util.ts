export const {assign, freeze} = Object;
export type InferTag<Tagger extends (entity: any) => any> = ReturnType<Tagger> extends {$: infer T} ? T : never;
export function makeTag<Tag extends string>(tag: Tag) {
    return assign(
        <T>(entity: T): T & {$: Tag} => freeze(assign(entity, {$: tag})),
        {$: (v: any) => v && v.$ === tag}
    );
}