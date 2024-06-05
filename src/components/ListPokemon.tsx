"use client"

import type { PokemonResults } from "@/models/Pokemons";
import { observer } from "mobx-react";
import { useStores } from "@/hooks/useStore";

function ListPokemonComponent() {
  const {
    pokemonStore: { ListPokemon },
  } = useStores();
  if(!ListPokemon) return <h2 className="m-auto text-2xl font-bold">Pokemon Not Found</h2>
  return (
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Is Fav?</th>
      </tr>
      </thead>
      <tbody>
      {
        ListPokemon.map(p => {
          return (
            <tr key={p.name}>
              <td>{p.name}</td>
              <td></td>
            </tr>
          )
        })
      }
      </tbody>
    </table>
  );
}

export default observer(ListPokemonComponent)