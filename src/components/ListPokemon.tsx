"use client"

import { observer } from "mobx-react";
import { useStores } from "@/hooks/useStore";
import { makeStyles, Image, Spinner, tokens, Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-components';

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
    cursor:"pointer",
    textAlign:"center",
    width:"90%",
    margin:"auto",
    backgroundColor:tokens.colorNeutralForegroundInverted,
    marginTop:tokens.spacingVerticalXL,
    padding:tokens.spacingVerticalMNudge,
    boxShadow:tokens.shadow4,
    borderRadius: tokens.borderRadiusLarge,
  },
  ColContainerImage:{
    width:"100%",
    height:"122px",
    background:tokens.colorNeutralBackground1Selected
  },
  ColHidden:{
    display:"none"
  },
  PokemonId:{
    display:"block",
    fontSize:tokens.fontSizeBase200
  },
  PokemonName:{
    height:"39px",
    display:"block",
    fontSize:tokens.fontSizeBase300,
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase200
  },
  PokemonType:{
    display:"flex",
    flexDirection:"row",
    justifyContent: "center",
    alignItems:"center",
    gap:tokens.spacingHorizontalXXS
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
  },
  CountPokemon:{
    fontFamily:tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase200,
    color:tokens.colorNeutralForeground4,
    textAlign:"center",
  },
  tableMetadata:{
    fontSize:tokens.fontSizeBase200,
    width:"80%",
    '& td':{
      verticalAlign:"top",
      padding:tokens.spacingVerticalXXS
    }
  },
  tableBreakWord:{
    wordBreak:"break-word",
    '@media screen and (min-width:768px)':{
      wordBreak:"unset"
    }
  }
})

function ListPokemonComponent() {
  const classes = useClasses();
  const {
    pokemonStore: { isLoading, ListPokemon, PokemonResults, MasterType },
  } = useStores();
  const CountDisplay = ListPokemon.filter(e => e.display).length
  if(isLoading) return (
    <div className={ classes.loadingScreen }>
      <Spinner className="loader" size="huge" /><br />
      Loading...
    </div>
  )
  return (
    <div>
      <h2 className={!PokemonResults || CountDisplay == 0 ? classes.NotFound : classes.ColHidden }>Pokemon Not Found</h2>
      <div className={ isLoading || CountDisplay == 0 ? classes.ColHidden : classes.CountPokemon }>Displaying {CountDisplay} Pokemon</div>
      <div className={ isLoading ? classes.ColHidden : classes.FlexContainer}>
        {
          ListPokemon.map(p => {
            return (
              <Popover key={p.name} positioning={"above"} withArrow>
                <PopoverTrigger disableButtonEnhancement>
                  <div className={ p.display ? classes.ColContainer : classes.ColHidden }>
                    <Image
                      className={classes.ColContainerImage}
                      alt={p.name}
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
                    />
                    <span className={classes.PokemonId}># { p.id }</span>
                    <span className={classes.PokemonName}>{ p.name.replace("-"," ") }</span>
                    <div  className={classes.PokemonType}>
                      {
                        p.type?.map(el => {
                          return (
                            <Image key={`${p.name}-${el}`} src={`/type/${el}.gif`} />
                          )
                        })
                      }
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverSurface tabIndex={-1}>
                  <div>
                    <h3>Metadata</h3>
                    <table className={classes.tableMetadata}>
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>:</td>
                        <td>{ p.name.toLowerCase() }</td>
                      </tr>
                      <tr>
                        <td>URL</td>
                        <td>:</td>
                        <td className={classes.tableBreakWord}>{ p.url }</td>
                      </tr>
                      <tr>
                        <td>Image</td>
                        <td>:</td>
                        <td className={classes.tableBreakWord}>{ `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}</td>
                      </tr>
                    </tbody>
                    </table>
                  </div>
                </PopoverSurface>
              </Popover>
            )
          })
        }
      </div>
    </div>
  );
}

export default observer(ListPokemonComponent)