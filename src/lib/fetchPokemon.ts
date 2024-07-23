import type { PokemonResults } from "@/models/Pokemons";
import { ListPokemonSchema } from "@/models/Pokemons";

type RequestParam = {
    page:number,
    filter:{
        search:string,
        type:string,
        ability:string,
        move:string,
    } | null
}

export default async function fetchPokemon(url:string, params:RequestParam): Promise<PokemonResults | undefined>{
    try{
        const res = await fetch(url,{method:'POST', body: JSON.stringify(params)})
        const pokemonResults:PokemonResults = await res.json()
        // console.log(pokemonResults)

        const parsedData = ListPokemonSchema.parse(pokemonResults)
        if(parsedData.results.length === 0) return undefined

        return parsedData
    }catch(e){
        if(e instanceof Error) console.log(e.stack)

    }
}