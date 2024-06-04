import { z } from 'zod'

export const ListPokemonSchema = z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(z.object({
        name: z.string(),
        url : z.string()
    }))
})

export type PokemonResults = z.infer<typeof ListPokemonSchema>