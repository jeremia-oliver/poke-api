"use client"

import { makeStyles, SearchBox, tokens } from '@fluentui/react-components';
import { useStores } from "@/hooks/useStore";
import { observer } from 'mobx-react';

const useClasses = makeStyles({
  SearchBackground:{
    width:"100%",
    paddingBottom:"100px",
    paddingTop:"100px",
    backgroundImage: "url('/lumiose-city.png')",
    backgroundPosition:"center",
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",
    marginBottom:tokens.spacingVerticalXL,
  },
  SearchContainer:{
    display:"flex",
    padding: tokens.spacingVerticalMNudge,
    width: "80%",
    maxWidth: "480px",
    margin:"auto",
    borderRadius:tokens.borderRadiusLarge,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(5px)",
  },
  SearchBox:{
    width: "100%",
    borderRadius: tokens.borderRadiusLarge,
    margin:"auto",
  }
})

function SearchBoxComponent() {
  const {
    filterStore: { PokemonType, PokemonAbility, PokemonMove },
    pokemonStore: { setSearchPokemon },
  } = useStores();
  const classes = useClasses()
  return (
    <div className={classes.SearchBackground}>
    <div className={classes.SearchContainer}>
      <SearchBox className={classes.SearchBox} size='large' appearance="outline" placeholder="Search by name" onChange={(e) => setSearchPokemon((e.target as HTMLInputElement).value, PokemonType, PokemonAbility, PokemonMove) } />
    </div>
    </div>
  );
}
export default observer(SearchBoxComponent)