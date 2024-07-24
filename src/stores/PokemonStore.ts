import { makeAutoObservable, runInAction } from 'mobx';
import fetchPokemon from "@/lib/fetchPokemon";
import { fetchTypeDetails, fetchAbilityDetails, fetchMoveDetails } from '@/lib/fetchDetail';
import type { PokemonResults } from "@/models/Pokemons";
import type { TypeResults, AbilityResults, MoveResults } from "@/models/Details";
import Master from "../api/MasterType.json";

type RequestParam = {
    page:number,
    filter:{
        search:string,
        type:string,
        ability:string,
        move:string,
    } | null
}
// DEFAULT STATE
class PokemonStore {
    page : number = 1;
    items : number = 20;
    isLoading: boolean = false;
    isSearch: boolean = false;
    TotalPage : number = 0;
    TotalItems : number = 0;
    SearchPokemon: string = '';
    TypePokemon: string = '';
    AbilityPokemon: string = '';
    MovePokemon:string = '';
    PokemonResults: PokemonResults | undefined;
    ListPokemon: {id:number, name:string, url:string, type:string[]|undefined, display:boolean}[] = [];
    TypeResults: TypeResults | undefined;
    AbilityResults: AbilityResults | undefined;
    MoveResults: MoveResults | undefined;
    MasterType: {name:string, type:string[]}[] = Master.Types;

    constructor() {
        makeAutoObservable(this);
    }

    fetchPokemon = async (params:RequestParam) => {
        const url   = "https://func-ause-pokeapi-jere.azurewebsites.net/api/pokemon"
        // const url = "http://localhost:7071/api/pokemon"
        runInAction(() => {
            this.isLoading = true;
            this.ListPokemon = [];
        })
        this.PokemonResults = await fetchPokemon(url, params);
        this.PokemonResults?.results.forEach((e) => {
            const explodeUrl = e.url.split("/")
            const pokemonID = parseInt(explodeUrl[6]);
            const pokemonType = this.MasterType.find((el) => { return el.name == e.name})?.type
            
            runInAction(() => {
            this.ListPokemon.push({id: pokemonID, name:e.name.toUpperCase(), url:e.url, type:pokemonType, display:true})
            })
        });
        console.log(this.PokemonResults);
        runInAction(() => {
        this.TotalItems = !this.PokemonResults ? 0 : (this.PokemonResults.count > 1025 ? 1025 : this.PokemonResults.count);
        this.TotalPage = this.TotalItems > 0 ? Math.ceil(this.TotalItems / this.items) : 0;
        this.isLoading = false;
        })
    }

    setSearchPokemon = (param:string, type:string, ability:string, move:string) => {
        runInAction(() => {
            this.SearchPokemon = param;
            this.filterPokemon(type, ability, move)
        })
    };

    filterPokemon = async (type:string, ability:string, move:string) => {
        const filterRequest = {
            search: this.SearchPokemon,
            type: type.toLowerCase().replace(" ","-"),
            ability:ability.toLowerCase().replace(" ","-"),
            move: move.toLowerCase().replace(" ","-")
        }
        runInAction(() => {
            this.page = 1
            this.TypePokemon = type.toLowerCase().replace(" ","-");
            this.AbilityPokemon = ability.toLowerCase().replace(" ","-");
            this.MovePokemon = move.toLowerCase().replace(" ","-");
            this.fetchPokemon({page:1, filter:filterRequest});
        });
    }

    handlePaging = (page:number) => {
        let filterRequest = null;
        if(this.SearchPokemon != '' || this.TypePokemon != '' || this.AbilityPokemon != '' || this.MovePokemon != ''){
            filterRequest = {
                search: this.SearchPokemon,
                type: this.TypePokemon,
                ability:this.AbilityPokemon,
                move: this.MovePokemon
            }
        }
        runInAction(() => {
            this.page = page
            this.fetchPokemon({page:page, filter:filterRequest});
        });

    }
 
}
export default PokemonStore;