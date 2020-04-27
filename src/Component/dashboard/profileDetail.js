import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { getDesignationLabel } from "../../Shared/function";

const useStyles = makeStyles((theme) => ({
  tabletext: {
    fontSize: "0.875rem !important",
  },
  tableLink: {
    textDecoration: "none",
    fontSize: "1rem !important",
  },
}));

const ProfileDetail = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography color="textSecondary" className={classes.tabletext}>
        {props.content}
      </Typography>
      {props.link ? (
        <Typography
          color="textPrimary"
          component={Link}
          to={"kpa-profile?type=name&&value=" + props.data1}
          className={classes.tableLink}
        >
          {props.name}
        </Typography>
      ) : (
        <Typography color="textPrimary" className={classes.tableLink}>
          {props.name}
        </Typography>
      )}
      <Typography color="textSecondary" className={classes.tabletext}>
        {props.data1}
      </Typography>
      <Typography color="textSecondary" className={classes.tabletext}>
        {props.link ? getDesignationLabel(props.data2) : props.data2}
      </Typography>
    </React.Fragment>
  );
};

export default ProfileDetail;
