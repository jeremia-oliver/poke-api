import type { TypeResults, AbilityResults, MoveResults } from "@/models/Details";
import { TypeSchema, AbilitySchema, MoveSchema } from "@/models/Details";

export async function fetchTypeDetails(url:string): Promise<TypeResults | undefined>{
    try{
        const res = await fetch(url)
        const results:TypeResults = await res.json()
        // console.log(results)
        const parsedData = TypeSchema.parse(results)
        if(parsedData.pokemon.length === 0) return undefined
        
        return parsedData
    }catch(e){
        if(e instanceof Error) console.log(e.stack)
    }
}

export async function fetchAbilityDetails(url:string): Promise<AbilityResults | undefined>{
    try{
        const res = await fetch(url)
        const results:AbilityResults = await res.json()
        // console.log(results)
        const parsedData = AbilitySchema.parse(results)
        if(parsedData.pokemon.length === 0) return undefined
        
        return parsedData
    }catch(e){
        if(e instanceof Error) console.log(e.stack)
    }
}

export async function fetchMoveDetails(url:string): Promise<MoveResults | undefined>{
    try{
        const res = await fetch(url)
        const results:MoveResults = await res.json()
        // console.log(results)
        const parsedData = MoveSchema.parse(results)
        if(parsedData.learned_by_pokemon.length === 0) return undefined
        
        return parsedData
    }catch(e){
        if(e instanceof Error) console.log(e.stack)
    }
}