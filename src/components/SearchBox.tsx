"use client"

import { makeStyles, SearchBox } from '@fluentui/react-components';
import { useStores } from "@/hooks/useStore";
import { observer } from 'mobx-react';

const useClasses = makeStyles({
  SearchContainer:{
    display:"flex",
    paddingTop: "20px",
    paddingBottom: "20px",
    width: "80%",
    maxWidth: "800px",
    margin:"auto"
  },
  SearchBox:{
    width: "100%",
    borderRadius: "5px",
    margin:"auto"
  }
})

function SearchBoxComponent() {
  const {
    pokemonStore: { setSearchPokemon },
  } = useStores();
  const classes = useClasses()
  return (
    <div className={classes.SearchContainer}>
      <SearchBox className={classes.SearchBox} size='large' appearance="outline" placeholder="Search by name" onKeyUp={(e) => setSearchPokemon((e.target as HTMLInputElement).value) } />
      
    </div>
  );
}
export default observer(SearchBoxComponent)