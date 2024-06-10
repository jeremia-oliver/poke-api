"use client"
import React from "react";
import { makeStyles, Combobox, useComboboxFilter, useId, ComboboxProps,Label,tokens  } from '@fluentui/react-components';
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

function PokemonTypeOption() {
  const classes = useClasses();
  const {
    filterStore: { PokemonType, ListType, setPokemonType },
  } = useStores();
  const comboId = useId();
  const [query, setQuery] = React.useState<string>(PokemonType);
  const children = useComboboxFilter(query, ListType, {
    noOptionsMessage: "No pokemon type match your search.",
  });
  const onOptionSelect: ComboboxProps["onOptionSelect"] = (e, data) => {
    setQuery(data.optionText ?? "");
    setPokemonType(data.optionText ?? "");
  };

  return (
      <div>
        <Label size="small" weight="semibold" className={classes.LabelContainer} id={comboId}>Pokemon Type</Label>
        <Combobox
          clearable
          listbox={{ className: classes.listbox }}
          positioning={"below"}
          onOptionSelect={onOptionSelect}
          aria-labelledby={comboId}
          placeholder="Select a type"
          onChange={(ev) => setQuery(ev.target.value)}
          value={query}>
          {children}
        </Combobox>
      </div>
  );
}

export default observer(PokemonTypeOption)