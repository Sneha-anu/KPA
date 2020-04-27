import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from '@material-ui/core/Toolbar';
import { blue } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
import Timeline from '@material-ui/icons/Timeline';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: '#eee',
  },
  appBar: {
    background : blue.A900,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  whitecolor: {
    color: '#fff',
    width: '30px',
    height: '30px',
    margin: '4px 4px -10px',
    textAlign: 'center',
    lineHeight: '33px',
  },
  gridcontent: {
    marginBottom:'15px',
  },
  navTab: {
    padding: '5px',
    marginLeft: '15px',
    minWidth: '0'
  },
  toolBar: {
    minHeight: 0,
  }
}));

const NavBar = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Typography variant="h6" mr={2}>
            <Timeline className={classes.whitecolor} fontSize="large"/> KPA Tracker
          </Typography>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Dashboard" component={Link} to="/" id="dashboard"  className={classes.navTab}/>
            <Tab
              label="Board"
              component={Link}
              to={{
                pathname: "/kpa-profile",
                search: "?type=kpa&&value=component"
              }}
              id="kpa-profile" className={classes.navTab}
            />
          </Tabs>
        </Toolbar>        
      </AppBar>
    </div>
  );
};

export default NavBar;
