import { z } from 'zod'

export const ListPokemonSchema = z.object({
    count: z.number(),
    results: z.array(z.object({
        name: z.string(),
        url : z.string()
    }))
})

export type PokemonResults = z.infer<typeof ListPokemonSchema>