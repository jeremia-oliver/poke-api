import type { PokemonResults } from "@/models/Pokemons";
import { ListPokemonSchema } from "@/models/Pokemons";

export default async function fetchPokemon(url:string): Promise<PokemonResults | undefined>{
    try{
        const res = await fetch(url)
        const pokemonResults:PokemonResults = await res.json()
        //console.log(pokemonResults)

        const parsedData = ListPokemonSchema.parse(pokemonResults)
        if(parsedData.results.length === 0) return undefined

        return parsedData
    }catch(e){
        if(e instanceof Error) console.log(e.stack)

    }
}