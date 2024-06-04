import fetchPokemon from "@/lib/fetchPokemon";
import type { PokemonResults } from "@/models/Pokemons";

export default async function ListPokemonComponent() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
  const Pokemons : PokemonResults | undefined = await fetchPokemon(url)
  if(!Pokemons) return <h2 className="m-auto text-2xl font-bold">Pokemon Not Found</h2>
  return (
    <>
    { Pokemons.results.map((po,index) => (
      <div>
        {index + 1}
      </div>
    )) }
    </>
  );
}