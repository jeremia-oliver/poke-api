"use client"

import { observer } from "mobx-react";
import { useStores } from "@/hooks/useStore";
import { makeStyles, Image, Spinner, tokens } from '@fluentui/react-components';

const useClasses = makeStyles({
  FlexContainer:{
    display:"grid",
    paddingBottom: "100px",
    gridTemplateColumns: "50% 50%",
    width:"90%",
    maxWidth:"1000px",
    margin:"auto",
    alignItems:"end",
    '@media screen and (min-width:468px)':{
      gridTemplateColumns: "25% 25% 25% 25%",
    },
    '@media screen and (min-width:768px)':{
      gridTemplateColumns: "20% 20% 20% 20% 20%",
    }
  },
  ColContainer:{
    textAlign:"center",
    width:"100%",
    margin:"auto",
    marginTop:"20px"
  },
  ColContainerImage:{
    width:"100%"
  },
  ColHidden:{
    display:"none"
  },
  PokemonId:{
    display:"block",
  },
  loadingScreen:{
    display:"block",
    width:"90%",
    maxWidth:"1000px",
    margin:"auto",
    marginTop:"100px",
    textAlign:"center"
  },
  NotFound:{
    color:tokens.colorNeutralForeground4,
    textAlign:"center",
    paddingTop:"100px",
    paddingBottom:"20vh"
  }
})

function ListPokemonComponent() {
  const classes = useClasses();
  const {
    pokemonStore: { isLoading, ListPokemon, PokemonResults },
  } = useStores();
  const CountDisplay = ListPokemon.filter(e => e.display).length
  if(!PokemonResults || CountDisplay == 0) return <h2 className={classes.NotFound}>Pokemon Not Found</h2>
  return (
    <div>
      <div className={ isLoading ? classes.loadingScreen : classes.ColHidden }>
        <Spinner size="huge" /><br />
        Loading...
      </div>
      <div className={ isLoading ? classes.ColHidden : classes.FlexContainer}>
        {
          ListPokemon.map(p => {
            return (
              <div key={p.name}  className={ p.display ? classes.ColContainer : classes.ColHidden }>
                <Image
                  className={classes.ColContainerImage}
                  alt={p.name}
                  shape="circular"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
                />
                <span className={classes.PokemonId}># { p.id }</span>
                <span>{ p.name }</span>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default observer(ListPokemonComponent)