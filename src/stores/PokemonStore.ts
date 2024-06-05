import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import fetchPokemon from "@/lib/fetchPokemon";
import type { PokemonResults } from "@/models/Pokemons";

// DEFAULT STATE
class PokemonStore {
    SearchPokemon: string = '';
    PokemonResults: PokemonResults | undefined;
    ListPokemon: {name:string, url:string}[] | undefined = [];

    constructor() {
        makeAutoObservable(this);
        runInAction(this.fetchPokemon);
    }

    fetchPokemon = async () => {
        const url = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
        const fetch = await fetchPokemon(url)
        this.PokemonResults = fetch;
        this.ListPokemon = this.PokemonResults?.results;
    }

    setSearchPokemon = (param:string) => {
        this.SearchPokemon = param;
        this.ListPokemon = this.PokemonResults?.results.filter((e) => { return e.name.includes(param.toLowerCase(), 0) });
    };
 
}
export default PokemonStore;