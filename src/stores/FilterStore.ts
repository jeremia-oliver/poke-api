import { makeAutoObservable, runInAction } from 'mobx';
import fetchOptions from "@/lib/fetchOptions";
import type { OptionsResults } from "@/models/Options";
import fetchPokemon from "@/lib/fetchPokemon";
import type { PokemonResults } from "@/models/Pokemons";

// DEFAULT STATE
class FilterStore {
    PokemonType: string = '';
    TypeResults: PokemonResults | undefined;
    ListType: {children:string, value:string}[] = [];
    PokemonAbility: string = '';
    AbilityResults: PokemonResults | undefined;
    ListAbility: {children:string, value:string}[] = [];
    PokemonMove: string = '';
    MoveResults: PokemonResults | undefined;
    ListMove: {children:string, value:string}[] = [];
    ListFilter: {type:string, ability:string, move:string} = { type:"", ability:"", move:"" }

    constructor() {
        makeAutoObservable(this);
        runInAction(this.fetchPokemonOption);
    }

    fetchPokemonOption = async () => {
        const url   = "https://func-ause-pokeapi-jere.azurewebsites.net/api/option"
        // const url = "http://localhost:7071/api/option"
        const Results:OptionsResults | undefined = await fetchOptions(url);
        this.TypeResults = Results?.TYPE;
        this.AbilityResults = Results?.ABILITY;
        this.MoveResults = Results?.MOVE;

        Results?.TYPE.results.forEach((e) => {
            const names = e.name.toUpperCase()
            this.ListType.push({children:names, value:names})
        });
        Results?.ABILITY.results.forEach((e) => {
            const names = e.name.replace("-"," ").toUpperCase()
            this.ListAbility.push({children:names, value:names})
        });
        Results?.MOVE.results.forEach((e) => {
            const names = e.name.replace("-"," ").toUpperCase()
            this.ListMove.push({children:names, value:names})
        });
    }

    setPokemonType = (param:string) => {
        runInAction(() => {this.PokemonType = param;})
    };

    setPokemonAbility = (param:string) => {
        runInAction(() => {this.PokemonAbility = param;})
    };

    setPokemonMove = (param:string) => {
        runInAction(() => {this.PokemonMove = param; })
    };

    setListFilter = (type:string, ability:string, move:string) => {
        runInAction(() => {
            this.ListFilter.type = type;
            this.ListFilter.ability = ability;
            this.ListFilter.move = move;    
        })
    }

    
 
}
export default FilterStore;