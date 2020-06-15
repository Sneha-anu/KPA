import React from "react";
import { getRecentKPAModification } from "../../Shared/function";
import {
  Box,
  Paper,
  Grid,
  CardHeader,
  Avatar,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { red, blue } from "@material-ui/core/colors";
import Detail from "./profileDetail";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import { upperCase, camelCase } from "lodash";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    background: "transparent",
    borderRadius: "0",
    boxShadow: "none",
  },
  topbox: {
    marginLeft: "15px",
    marginTop: "0",
    padding: "20px",
    background: blue.A400,
    borderRadius: "3px",
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
    color: "#3C4858",
    fontWeight: "400",
    marginLeft: "10px",
  },
  avatar: {
    backgroundColor: red[500],
  },
  sidecard: {
    borderRadius: "5px",
    marginBottom: "5px",
  },
  cardContent: {
    paddingTop: "0 !important",
    paddingBottom: "15px !important",
  },
  noRecentNotification: {
    background: "linear-gradient(60deg, #e11313f5, #f807072e)",
    marginTop: 5,
    padding: theme.spacing(2),
    margin: "auto",
    marginBottom: theme.spacing(1),
  },
}));

const RecentActivities = (props) => {
  const classes = useStyles();

  // const recentNotification = {
  //   background: "linear-gradient(60deg, #ab47bc, #8e24aa)",
  //   boxShadow:
  //     "0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(156, 39, 176,.4)",
  //   width: "100%",
  // };

  const appendData = (recentModifiedKPA) => {
    return recentModifiedKPA.map((recentKPA, index) => {
      return (
        <Grid item xs={12} sm={6} lg={12} key={index}>
          <Card
            className={classes.sidecard}
            style={{ borderLeft: `4px solid ${recentKPA.color.main}` }}
            width="100%"
          >
            <CardHeader
              pb={2}
              avatar={
                <Avatar
                  alt={recentKPA.name}
                  src={"/images/" + recentKPA.name + ".jpg"}
                  className={classes.avatar}
                ></Avatar>
              }
              title={recentKPA.name}
              subheader={new Date(recentKPA.modified_on).toLocaleDateString()}
            />
            <CardContent className={classes.cardContent}>
              <Typography variant="overline" display="block">
                {upperCase(camelCase(recentKPA.type))}
              </Typography>
              <Typography className={classes.sidebarTitle} gutterBottom>
                {recentKPA.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {recentKPA.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      );
    });
  };

  const noRecentActivities = (content) => {
    return (
      <Paper className={classes.noRecentNotification} elevation={3}>
        <Grid container spacing={2}>
          <Detail content={content} />
        </Grid>
      </Paper>
    );
  };

  const getDetails = () => {
    const recentModifiedKPA = getRecentKPAModification(props.data);
    const recentActivitiesLength = recentModifiedKPA.length;
    if (props.loading) {
      return (
        <React.Fragment>
          <Paper className={classes.paper}>
            <Box pt={0.5}>
              <Skeleton />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
              <Skeleton width="40%" />
            </Box>
          </Paper>
          <Paper className={classes.paper}>
            <Box pt={0.5}>
              <Skeleton />
              <Skeleton width="60%" />
              <Skeleton width="60%" />
              <Skeleton width="40%" />
            </Box>
          </Paper>
        </React.Fragment>
      );
    } else if (recentActivitiesLength > 0) {
      return <React.Fragment>{appendData(recentModifiedKPA)} </React.Fragment>;
    } else {
      return (
        <React.Fragment>
          {noRecentActivities("No Recent Activities!")}
        </React.Fragment>
      );
    }
  };

  return (
    <React.Fragment>
      <Grid container item xs={12}>
        <Box className={classes.wholeContainer} style={{ width: "100%" }}>
          <Box p={2}>
            <NotificationsActiveIcon className={classes.whitecolor} />
            <Typography className={classes.containertitle} display="inline">
              Notifications
            </Typography>
          </Box>
          <Divider />
          <Paper className={classes.paper}>{getDetails()}</Paper>
        </Box>
      </Grid>
    </React.Fragment>
  );
};

export default RecentActivities;
