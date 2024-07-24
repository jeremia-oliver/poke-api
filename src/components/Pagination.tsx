"use client"
import { makeStyles, Button } from '@fluentui/react-components';
import { useStores } from "@/hooks/useStore";
import { observer } from 'mobx-react';
import { ChevronLeftRegular,ChevronRightRegular,ArrowNextRegular,ArrowPreviousRegular } from '@fluentui/react-icons';
import React from 'react';

const useClasses = makeStyles({
  PaginationContainer:{
    width:"100%",
    display: "flex",
    justifyContent: "center",
    alignItems:"center",
    paddingBottom : "50px",
  },
  ButtonSpacing:{
    marginLeft:"5px",
    marginRight:"5px"
  },
  ColHidden:{
    display:"none"
  }
})

function PaginationComponent() {
  
    const {
        pokemonStore: { page, TotalPage, handlePaging },
    } = useStores();
    const classes = useClasses()
    const ButtonClick = (v:number) => {
        handlePaging(v)
    }
    return (
        <div className={ TotalPage == 0 ? classes.ColHidden : classes.PaginationContainer}>
            
            <Button title="Jump to First Page" size="medium" icon={<ArrowPreviousRegular />} className={classes.ButtonSpacing} disabled={ page == 1 } onClick={ (e) => ButtonClick(1) }/>
            <Button title="Previous Page" size="medium" icon={<ChevronLeftRegular />} className={classes.ButtonSpacing} disabled={ page == 1 } onClick={ (e) => ButtonClick(page - 1) }/>
            <div className={classes.ButtonSpacing}>
                <span>{page} of {TotalPage}</span>
            </div>
            <Button title="Next Page" size="medium" icon={<ChevronRightRegular />} className={classes.ButtonSpacing} disabled={ page == TotalPage } onClick={ (e) => ButtonClick(page + 1) }/>
            <Button title="Jump to Last Page" size="medium" icon={<ArrowNextRegular />} className={classes.ButtonSpacing} disabled={ page == TotalPage } onClick={ (e) => ButtonClick(TotalPage) }/>
        </div>
    );
}
export default observer(PaginationComponent)