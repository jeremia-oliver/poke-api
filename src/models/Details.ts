import { z } from 'zod'

export const PokemonSchema = z.object({
    slot: z.number(),
    pokemon: z.object({
        name: z.string(),
        url: z.string()
    })
})

export const TypeSchema = z.object({
    id: z.number(),
    name: z.string(),
    damage_relations: z.any(),
    past_damage_relations: z.any(),
    game_indices: z.any(),
    generation: z.any(),
    move_damage_class: z.any(),
    names: z.any(),
    pokemon: z.array(PokemonSchema),
    moves: z.any(),

})

export type TypeResults = z.infer<typeof TypeSchema>

export const AbilitySchema = z.object({
    id: z.number(),
    name: z.string(),
    is_main_series: z.boolean().nullable(),
    generation: z.any(),
    names: z.any(),
    effect_entries: z.any(),
    effect_changes: z.any(),
    flavor_text_entries: z.any(),
    pokemon: z.array(PokemonSchema)

})

export type AbilityResults = z.infer<typeof AbilitySchema>

export const MoveSchema = z.object({
    id: z.number(),
    name: z.string(),
    accuracy: z.number().nullable(),
    effect_chance: z.number().nullable(),
    pp: z.number().nullable(),
    priority: z.number().nullable(),
    power: z.number().nullable(),
    contest_combos: z.any(),
    contest_type: z.any(),
    contest_effect: z.any(),
    damage_class: z.any(),
    effect_entries: z.any(),
    effect_changes: z.any(),
    learned_by_pokemon: z.array(z.object({
        name: z.string(),
        url: z.string()
    })),
    flavor_text_entries: z.any(),
    generation: z.any(),
    machines: z.any(),
    meta: z.any(),
    names: z.any(),
    past_values: z.any(),
    stat_changes: z.any(),
    super_contest_effect: z.any(),
    target: z.any(),
    type: z.any(),

})

export type MoveResults = z.infer<typeof MoveSchema>