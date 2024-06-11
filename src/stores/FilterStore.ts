import { makeAutoObservable, runInAction } from 'mobx';
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
        runInAction(this.fetchPokemonType);
        runInAction(this.fetchPokemonAbility);
        runInAction(this.fetchPokemonMove);
    }

    fetchPokemonType = async () => {
        const url = "https://pokeapi.co/api/v2/type?limit=18&offset=0"
        this.TypeResults = await fetchPokemon(url);
        this.TypeResults?.results.forEach((e) => {
            const names = e.name.toUpperCase()
            this.ListType.push({children:names, value:names})
        });
    }

    fetchPokemonAbility = async () => {
        const url = "https://pokeapi.co/api/v2/ability?limit=367&offset=0"
        this.AbilityResults = await fetchPokemon(url);
        this.AbilityResults?.results.forEach((e) => {
            const names = e.name.replace("-"," ").toUpperCase()
            this.ListAbility.push({children:names, value:names})
        });
    }

    fetchPokemonMove = async () => {
        const url = "https://pokeapi.co/api/v2/move?limit=937&offset=0"
        this.MoveResults = await fetchPokemon(url);
        this.MoveResults?.results.forEach((e) => {
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