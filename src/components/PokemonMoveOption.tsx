"use client"
import React from "react";
import { makeStyles, Combobox, useComboboxFilter, useId, ComboboxProps,Label  } from '@fluentui/react-components';
import { useStores } from "@/hooks/useStore";
import { observer } from 'mobx-react';


const useClasses = makeStyles({
  LabelContainer:{
    display:"block",
    marginTop:"10px"
  },
  listbox:{
    maxHeight:"200px"
  }
})

function PokemonMoveOption() {
  const classes = useClasses();
  const {
    filterStore: { PokemonMove, ListMove, setPokemonMove },
  } = useStores();
  const comboId = useId();
  const [query, setQuery] = React.useState<string>(PokemonMove);
  const children = useComboboxFilter(query, ListMove, {
    noOptionsMessage: "No pokemon move match your search.",
  });
  const onOptionSelect: ComboboxProps["onOptionSelect"] = (e, data) => {
    setQuery(data.optionText ?? "");
    setPokemonMove(data.optionText ?? "");
  };

  return (
      <div>
        <Label size="small" weight="semibold" className={classes.LabelContainer} id={comboId}>Pokemon Move</Label>
        <Combobox
          listbox={{ className: classes.listbox }}
          positioning={"below"}
          onOptionSelect={onOptionSelect}
          aria-labelledby={comboId}
          placeholder="Select a move"
          onChange={(ev) => setQuery(ev.target.value)}
          value={query}>
          {children}
        </Combobox>
      </div>
  );
}

export default observer(PokemonMoveOption)