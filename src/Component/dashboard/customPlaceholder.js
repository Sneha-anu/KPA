import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BarChart from "@material-ui/icons/BarChart";
import PieChartIcon from "@material-ui/icons/PieChart";
import TimelineIcon from "@material-ui/icons/Timeline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { startCase, camelCase } from "lodash";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1, 2, 1),
    background: "transparent",
    marginTop: "0",
    borderRadius: "0",
    boxShadow: "none",
    height: "230px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  whitecolor: {
    color: "#4b4b4b",
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
    // color: "#3C4858",
    // fontWeight: "400",
    // marginLeft: "10px",
    fontSize: "18px",
    fontWeight: "500",
    color: "#4b4b4b",
  },
  formControl: {
    minWidth: 100,
  },
  legend: {
    borderRadius: "50%",
    width: "14px",
    height: "14px",
    overflow: "hidden",
    display: "inline-block",
    marginRight: "4px",
  },
}));

const CustomPlaceholder = (props) => {
  const COLOR = props.color.color;

  // console.log(COLOR);
  const classes = useStyles();
  const getIconLogo = () => {
    switch (props.id) {
      case "bar":
        return <BarChart className={classes.whitecolor} />;
      case "line":
        return <TimelineIcon className={classes.whitecolor} />;
      case "pie":
        return <PieChartIcon className={classes.whitecolor} />;
      default:
        return <BarChart className={classes.whitecolor} />;
    }
  };
  return (
    <Box className={classes.wholeContainer}>
      <Box p={1}>
        <Box component="span" display="inline">
          {getIconLogo()}
        </Box>
        <Typography className={classes.containertitle} display="inline">
          {props.label}
        </Typography>
      </Box>
      <Divider />
      <Paper className={classes.paper}>
        {props.id === "bar" && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <div>
              <Box
                bgcolor={COLOR.primaryColor}
                className={classes.legend}
              ></Box>
              <span style={{ fontSize: "12px", marginRight: "14px" }}>
                Completed
              </span>
              <Box
                bgcolor={COLOR.secondaryColor}
                className={classes.legend}
              ></Box>
              <span style={{ fontSize: "12px" }}>Pending</span>
            </div>
            <FormControl className={classes.formControl}>
              <Select
                id="show-by-type"
                displayEmpty
                value={props.showBy}
                onChange={props.handleChange}
              >
                {props.choice.map((el) => (
                  <MenuItem key={el.id} value={el.id}>
                    {startCase(camelCase(el.value))}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}
        {props.children}
      </Paper>
    </Box>
  );
};

export default CustomPlaceholder;
CustomPlaceholder.defaultProps = {
  color: { color: { primaryColor: "", secondaryColor: "" } },
};
