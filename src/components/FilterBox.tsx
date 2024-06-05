"use client"

import { makeStyles, Button } from '@fluentui/react-components';
import { FilterFilled } from '@fluentui/react-icons';


const useClasses = makeStyles({
  FilterContainer:{
    width: "95%",
    maxWidth: "1000px",
    margin:"auto",
    textAlign: "right"
  }
})

export default function FilterBoxComponent() {
  const classes = useClasses()
  return (
    <div className={classes.FilterContainer}>
    <Button icon={<FilterFilled />}>Filter</Button>
    </div>
  );
}