"use client"
import React from "react";
import { makeStyles, Button, Popover, PopoverSurface,PopoverTrigger, Tag, TagGroup,TagGroupProps, tokens  } from '@fluentui/react-components';
import { FilterFilled } from '@fluentui/react-icons';
import { useStores } from "@/hooks/useStore";
import { observer } from 'mobx-react';
import PokemonTypeOption from "./PokemonTypeOption";
import PokemonAbilityOption from "./PokemonAbilityOption";
import PokemonMoveOption from "./PokemonMoveOption";


const useClasses = makeStyles({
  FilterContainer:{
    display:"flex",
    flexDirection:"column",
    width: "95%",
    maxWidth: "1000px",
    margin:"auto",
    '@media screen and (min-width:768px)':{
      flexDirection:"row-reverse",
      justifyContent:"space-between",
      alignItems:"center"
    }
  },
  LabelContainer:{
    display:"block",
    marginBottom:tokens.spacingVerticalMNudge
  },
  FilterButton:{
    display:"block",
    marginTop:tokens.spacingVerticalXL
  },
  TagContainer:{
    display:"block",
    overflowX:"auto",
    marginBottom:tokens.spacingVerticalSNudge,
    marginTop:tokens.spacingVerticalSNudge,
    fontSize:tokens.fontSizeBase200,
    '@media screen and (min-width:768px)':{
      display:"flex",
      marginTop:"0px",
      marginBottom:"0px",
    }
  }
})

const FilterBoxContent = observer(() => {
  const classes = useClasses();
  const {
    filterStore: { PokemonType, PokemonAbility, PokemonMove,setListFilter },
    pokemonStore: { setSearchPokemon, SearchPokemon }
  } = useStores();
  const SetFilter = () => {
    setSearchPokemon(SearchPokemon,PokemonType, PokemonAbility, PokemonMove )
    setListFilter(PokemonType, PokemonAbility, PokemonMove)
  }
  return (
    <div>
      <PokemonTypeOption />
      <PokemonAbilityOption />
      <PokemonMoveOption />
      <Button className={classes.FilterButton} appearance="primary" onClick={SetFilter}>Filter</Button>
    </div>
  );
});


function FilterBoxComponent() {
  const classes = useClasses();  
  const {
    filterStore: { ListFilter, PokemonType, PokemonAbility, PokemonMove, setListFilter, setPokemonType, setPokemonAbility, setPokemonMove },
    pokemonStore: { setSearchPokemon, SearchPokemon }
  } = useStores();
  
  const removeItem: TagGroupProps["onDismiss"] = (_e, { value }) => {
    if(value == 'TYPE'){
      setPokemonType("")
      setListFilter("", PokemonAbility, PokemonMove)
      setSearchPokemon(SearchPokemon,"", ListFilter.ability, ListFilter.move )
    }else if(value == 'ABILITY'){
      setPokemonAbility("")
      setListFilter(PokemonType, "", PokemonMove)
      setSearchPokemon(SearchPokemon,ListFilter.type, "", ListFilter.move )
    }else if(value == "MOVE"){
      setPokemonMove("")
      setListFilter(PokemonType, PokemonAbility, "")
      setSearchPokemon(SearchPokemon,ListFilter.type, ListFilter.ability, "" )
    }
  };
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
      
      <div className={classes.TagContainer}>
      <TagGroup onDismiss={removeItem} >
        { ListFilter.type != '' &&
          <Tag
            size="small"
            appearance="brand"
            dismissible
            dismissIcon={{ "aria-label": "remove" }}
            value="TYPE"
            key="TYPE"
            shape="circular"
          >
            TYPE: { ListFilter.type }
          </Tag>
        }
        
        { ListFilter.ability != '' &&
          <Tag
            size="small"  
            appearance="brand"
            dismissible
            dismissIcon={{ "aria-label": "remove" }}
            value="ABILITY"
            key="ABILITY"
            shape="circular"
          >
            ABILITY: { ListFilter.ability }
          </Tag>
        }
        
        { ListFilter.move != '' &&
          <Tag
            size="small"
            appearance="brand"
            dismissible
            dismissIcon={{ "aria-label": "remove" }}
            value="MOVE"
            key="MOVE"
            shape="circular"
          >
            MOVE: { ListFilter.move }
          </Tag>
        }
        </TagGroup>
      </div>
    </div>
  );
}

export default observer(FilterBoxComponent)