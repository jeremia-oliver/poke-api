import { z } from 'zod'

const OptionsSchema = z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(z.object({
        name: z.string(),
        url : z.string()
    }))
})

export const ListOptionsSchema = z.object({
    TYPE: OptionsSchema,
    ABILITY: OptionsSchema,
    MOVE: OptionsSchema,
})

export type OptionsResults = z.infer<typeof ListOptionsSchema>