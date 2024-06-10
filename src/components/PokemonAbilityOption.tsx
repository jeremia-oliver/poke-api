"use client"
import React from "react";
import { makeStyles, Combobox, useComboboxFilter, useId, ComboboxProps,Label, tokens  } from '@fluentui/react-components';
import { useStores } from "@/hooks/useStore";
import { observer } from 'mobx-react';


const useClasses = makeStyles({
  LabelContainer:{
    display:"block",
    marginTop:tokens.spacingVerticalMNudge
  },
  listbox:{
    maxHeight:"200px"
  }
})

function PokemonAbilityOption() {
  const classes = useClasses();
  const {
    filterStore: { PokemonAbility, ListAbility, setPokemonAbility },
  } = useStores();
  const comboId = useId();
  const [query, setQuery] = React.useState<string>(PokemonAbility);
  const children = useComboboxFilter(query, ListAbility, {
    noOptionsMessage: "No pokemon ability match your search.",
  });
  const onOptionSelect: ComboboxProps["onOptionSelect"] = (e, data) => {
    setQuery(data.optionText ?? "");
    setPokemonAbility(data.optionText ?? "");
  };

  return (
      <div>
        <Label size="small" weight="semibold" className={classes.LabelContainer} id={comboId}>Pokemon Ability</Label>
        <Combobox
          clearable
          listbox={{ className: classes.listbox }}
          positioning={"below"}
          onOptionSelect={onOptionSelect}
          aria-labelledby={comboId}
          placeholder="Select an ability"
          onChange={(ev) => setQuery(ev.target.value)}
          value={query}>
          { children }
        </Combobox>
      </div>
  );
}

export default observer(PokemonAbilityOption)