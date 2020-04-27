import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    position: "sticky",
    top: 0,
    left: 0,
    zIndex: 999
  },
  background: {
    borderRight: "10px solid white",
    marginBottom: "10px"
  },
  paper: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.error.main,
    color: "white"
  }
}));

const TitleHeader = ({ titleTopic }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs className={classes.background}>
          <Paper className={classes.paper} bgcolor="primary.main">
            Name
          </Paper>
        </Grid>
        <Grid container item xs={9}>
          {Object.keys(titleTopic).map(el => (
            <Grid
              item
              xs
              key={titleTopic[el]["id"]}
              className={classes.background}
            >
              <Paper className={classes.paper}>{titleTopic[el]["title"]}</Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default TitleHeader;
