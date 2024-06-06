"use client"
import React from "react";
import { makeStyles, Button, Popover, PopoverSurface,PopoverTrigger, Combobox, useComboboxFilter, useId, ComboboxProps,Label  } from '@fluentui/react-components';
import { FilterFilled } from '@fluentui/react-icons';
import { useStores } from "@/hooks/useStore";
import { observer } from 'mobx-react';
import PokemonTypeOption from "./PokemonTypeOption";
import PokemonAbilityOption from "./PokemonAbilityOption";
import PokemonMoveOption from "./PokemonMoveOption";


const useClasses = makeStyles({
  FilterContainer:{
    width: "95%",
    maxWidth: "1000px",
    margin:"auto",
    textAlign: "right"
  },
  LabelContainer:{
    display:"block",
    marginBottom:"10px"
  },
  FilterButton:{
    display:"block",
    marginTop:"20px"
  }
})

const FilterBoxContent = observer(() => {
  const classes = useClasses();
  const {
    filterStore: { PokemonType, PokemonAbility, PokemonMove },
    pokemonStore: { setSearchPokemon, SearchPokemon }
  } = useStores();

  return (
    <div>
      <PokemonTypeOption />
      <PokemonAbilityOption />
      <PokemonMoveOption />
      <Button className={classes.FilterButton} appearance="primary" onClick={(e) => setSearchPokemon(SearchPokemon,PokemonType, PokemonAbility, PokemonMove )}>Filter</Button>
    </div>
  );
});


function FilterBoxComponent() {
  const classes = useClasses();  
  return (
    <div className={classes.FilterContainer}>
      
    <Popover positioning={"below-end"} trapFocus>
      <PopoverTrigger disableButtonEnhancement>
        <Button icon={<FilterFilled />}>Filter</Button>
      </PopoverTrigger>
      <PopoverSurface tabIndex={-1}>
        <FilterBoxContent />
      </PopoverSurface>
    </Popover>
    </div>
  );
}

export default FilterBoxComponent