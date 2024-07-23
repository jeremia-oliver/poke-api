import type { OptionsResults } from "@/models/Options";
import { ListOptionsSchema } from "@/models/Options";

export default async function fetchOptions(url:string): Promise<OptionsResults | undefined>{
    try{
        const res = await fetch(url)
        const optionsResults:OptionsResults = await res.json()

        const parsedData = ListOptionsSchema.parse(optionsResults)
        // if(parsedData.results.length === 0) return undefined

        return parsedData
    }catch(e){
        if(e instanceof Error) console.log(e.stack)

    }
}