import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BarChart from "@material-ui/icons/BarChart";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { blue } from "@material-ui/core/colors";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    background: "transparent",
    marginTop: "0",
    borderRadius: "0",
    boxShadow: "none",
    height: "200px",
  },
  topbox: {
    marginLeft: "15px",
    marginTop: "0",
    padding: "20px",
    background: blue.A400,
    borderRadius: "3px",
  },
  whitecolor: {
    color: "#fff",
    width: "30px",
    height: "30px",
    margin: "4px 4px -10px",
    textAlign: "center",
    lineHeight: "33px",
  },
  wholeContainer: {
    background: "#fff",
    borderRadius: "3px",
  },
  containertitle: {
    color: "#3C4858",
    fontWeight: "400",
    marginLeft: "10px",
  },
  formControl: {
    minWidth: 100,
  },
}));

const CustomPlaceholder = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.wholeContainer}>
      <Box>
        <Box component="div" display="inline" className={classes.topbox}>
          <BarChart className={classes.whitecolor} />
        </Box>
        <Typography className={classes.containertitle} display="inline">
          {props.label}
        </Typography>       
      </Box>
      <Paper className={classes.paper}>
      
        {props.id === "bar" && (
          <Box display="flex" justifyContent="flex-end">
            <FormControl className={classes.formControl}>
              <Select
                id="show-by-type"
                displayEmpty
                value={props.showBy}
                onChange={props.handleChange}
              >
                {props.choice.map((el) => (
                  <MenuItem key={el.id} value={el.id}>
                    {el.value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}
        
        {/* <Typography color="textSecondary">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a posuere turpis.
                </Typography> */}
        {props.children}
      </Paper>
    </Box>
  );
};

export default CustomPlaceholder;
