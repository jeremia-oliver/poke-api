
import PokemonStore from "./PokemonStore";
import FilterStore from "./FilterStore";

const pokemonStore = new PokemonStore();
const filterStore = new FilterStore();
export const RootStore = {  
    pokemonStore,
    filterStore,
};