import React from "react";
import Grid from "@material-ui/core/Grid";
import KpaForms from "./kpaForms";
const CustomForms = () => {
  return (
    <Grid container spacing={1} justify="center">
      <Grid container item xs={6} spacing={3} justify="center">
        <KpaForms />
      </Grid>
    </Grid>
  );
};

export default CustomForms;
