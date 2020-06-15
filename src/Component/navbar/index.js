import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import { blue } from "@material-ui/core/colors";
// import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import queryString from "query-string";
import { isEmpty } from "lodash";
import { useLocation } from "react-router-dom";
import { fakeAuth } from "../../service/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#eee",
  },
  appBar: {
    // background : blue.A900,
    background: "#333333",
  },
  toolbar: {
    minHeight: 0,
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  img: {
    height: "30px",
    textAlign: "center",
    marginRight: "5px",
    // lineHeight: "33px",
  },
  gridcontent: {
    marginBottom: "15px",
  },
  navTab: {
    padding: "5px",
    marginLeft: "15px",
    minWidth: "0",
  },
  toolBar: {
    minHeight: 0,
  },
}));

const NavBar = () => {
  const location = useLocation();
  const queryParam = queryString.parse(location.search);
  const [value, setValue] = React.useState(isEmpty(queryParam) ? 0 : 1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();
  return (
    <div>
      {fakeAuth.isAuthenticated && (
        <AppBar position="static" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <img
              className={classes.img}
              src="/KPA-Logo.svg"
              alt="KPA Tracker"
            />
            {/* <Typography variant="h6" mr={2}>
            KPA Tracker
          </Typography> */}
            <Tabs value={value} onChange={handleChange}>
              <Tab
                label="Home"
                component={Link}
                to="/"
                id="dashboard"
                className={classes.navTab}
              />
              <Tab
                label="KPA Board"
                component={Link}
                to={{
                  pathname: "/kpa-profile",
                  search: "?type=kpa&&value=component",
                }}
                id="kpa-profile"
                className={classes.navTab}
              />
            </Tabs>
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
};

export default NavBar;
