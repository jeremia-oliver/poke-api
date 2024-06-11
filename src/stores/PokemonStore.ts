import { makeAutoObservable, runInAction } from 'mobx';
import fetchPokemon from "@/lib/fetchPokemon";
import { fetchTypeDetails, fetchAbilityDetails, fetchMoveDetails } from '@/lib/fetchDetail';
import type { PokemonResults } from "@/models/Pokemons";
import type { TypeResults, AbilityResults, MoveResults } from "@/models/Details";
import Master from "../api/MasterType.json";

// DEFAULT STATE
class PokemonStore {
    isLoading: boolean = false;
    isSearch: boolean = false;
    SearchPokemon: string = '';
    PokemonResults: PokemonResults | undefined;
    ListPokemon: {id:number, name:string, url:string, type:string[]|undefined, display:boolean}[] = [];
    TypeResults: TypeResults | undefined;
    AbilityResults: AbilityResults | undefined;
    MoveResults: MoveResults | undefined;
    MasterType: {name:string, type:string[]}[] = Master.Types;

    constructor() {
        makeAutoObservable(this);
        runInAction(this.fetchPokemon);
    }

    fetchPokemon = async () => {
        const url = "https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0"
        runInAction(() => {
        this.isLoading = true;
        })
        this.PokemonResults = await fetchPokemon(url);
        this.PokemonResults?.results.forEach((e) => {
            const explodeUrl = e.url.split("/")
            const pokemonID = parseInt(explodeUrl[6]);
            const pokemonType = this.MasterType.find((el) => { return el.name == e.name})?.type
            
            runInAction(() => {
            this.ListPokemon.push({id: pokemonID, name:e.name.toUpperCase(), url:e.url, type:pokemonType, display:true})
            })
        });
        runInAction(() => {
        this.isLoading = false;
        })
    }

    setSearchPokemon = (param:string, type:string, ability:string, move:string) => {
        param = typeof param === 'undefined' ? "" : param;
        runInAction(() => {
        this.SearchPokemon = param;
        this.ListPokemon = this.ListPokemon.map(obj => {
            const newObj = Object.assign({}, obj);
            newObj.display = (obj.name).toLowerCase().includes(param.toLowerCase(), 0);
            return newObj;
        });
        })
        runInAction(() => { this.filterPokemon(type, ability, move) })
    };

    filterPokemon = async (type:string, ability:string, move:string) => {
        runInAction(() => {
            this.isLoading = true;
        })
        const FilterArray = [
            { endpoint: 'type', value: type.toLowerCase().replace(" ","-") },
            { endpoint: 'ability', value: ability.toLowerCase().replace(" ","-") },
            { endpoint: 'move', value: move.toLowerCase().replace(" ","-") },
        ]
        for(const e of FilterArray){
            if(e.value != ""){
                const url = `https://pokeapi.co/api/v2/${e.endpoint}/${e.value}`;
                if(e.endpoint == 'type'){
                    const thisArray:string[] = []
                    this.TypeResults = await fetchTypeDetails(url);
                    this.TypeResults?.pokemon.forEach((e) => {
                        thisArray.push(e.pokemon.name)
                    });
                    runInAction(() => {
                    this.ListPokemon = this.ListPokemon.map(obj => {
                        const newObj = Object.assign({}, obj);
                        newObj.display = newObj.display ? thisArray.includes(obj.name.toLowerCase(), 0) : false;
                        return newObj;
                    });
                    })
                }else if(e.endpoint == 'ability'){
                    const thisArray:string[] = []
                    this.AbilityResults = await fetchAbilityDetails(url);
                    this.AbilityResults?.pokemon.forEach((e) => {
                        thisArray.push(e.pokemon.name)
                    });
                    runInAction(() => {
                    this.ListPokemon = this.ListPokemon.map(obj => {
                        const newObj = Object.assign({}, obj);
                        newObj.display = newObj.display ? thisArray.includes(obj.name.toLowerCase(), 0) : false;
                        return newObj;
                    });
                    })
                }else if(e.endpoint == 'move'){
                    const thisArray:string[] = []
                    this.MoveResults = await fetchMoveDetails(url);
                    this.MoveResults?.learned_by_pokemon.forEach((e) => {
                        thisArray.push(e.name)
                    });
                    runInAction(() => {
                    this.ListPokemon = this.ListPokemon.map(obj => {
                        const newObj = Object.assign({}, obj);
                        newObj.display = newObj.display ? thisArray.includes(obj.name.toLowerCase(), 0) : false;
                        return newObj;
                    });
                    })
                }
            }  
        }
        
        runInAction(() => { this.isLoading = false; })
       
    }
 
}
export default PokemonStore;