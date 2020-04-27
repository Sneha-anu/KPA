import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ProfileDetail from "./profileDetail";
import { isEmpty } from "lodash";
import {
  Box,
  Paper,
  Avatar,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  Button,
} from "@material-ui/core";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import Skeleton from "@material-ui/lab/Skeleton";
import { red, blue } from "@material-ui/core/colors";
import Assignment from "@material-ui/icons/Assignment";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import CustomModel from "../../Shared/component/customModel";
import AddProfile from "../forms/addProfile";
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    background: "transparent",
    marginTop: "15px",
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
    marginLeft: "20px",
  },
  avatar: {
    backgroundColor: blue.A400,
  },
  tabletext: {
    fontSize: "0.875rem !important",
  },
  downloadIcon: {
    color: red[500],
  },
  transColor: {
    background: "#fff",
  },
  errColor: {
    backgroundColor: '#f2dede',
  },
  addEmpBtn: {
    marginTop:'5px',
    marginRight:'5px'
  }
}));

const Profile = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const getProfileDetailsProps = (name, data1, data2) => {
    return { name, data1, data2 };
  };
  const handleClose = () => {
    setOpen(false);
  };

  const profileSubmit = (arg) => {
    setOpen(false);
    props.profileSubmit();
  };

  const renderList = () => {
    // const data = props.data;
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
    } else {
      return props.data.map((profile) => {
        const projectDetails = profile.project_details;
        return (
          <TableRow
            key={profile.empId}
            className={
              !isEmpty(projectDetails) ? classes.transColor : classes.errColor
            }
          >
            <TableCell component="th" scope="row">
              <Box display="flex" alignItems="center" flexDirection="row">
                <Box>
                  <Avatar className={classes.avatar}>RR</Avatar>
                {/*  <Avatar
                    alt={profile.name}
                    src={"/images/" + profile.name + ".jpg"}
                /> */}
                </Box>
                <Box ml={2}>
                  <ProfileDetail
                    {...getProfileDetailsProps(
                      profile.name,
                      profile.empId,
                      profile.designation
                    )}
                    link={true}
                  />
                </Box>
              </Box>
            </TableCell>
            <TableCell>
              {!isEmpty(projectDetails) && (
                <ProfileDetail
                  {...getProfileDetailsProps(
                    projectDetails.name,
                    projectDetails.project_manager,
                    projectDetails.contact
                  )}
                  link={false}
                />
              )}
            </TableCell>
            <TableCell>
              <CloudDownloadIcon
                fontSize="large"
                className={classes.downloadIcon}
              />
            </TableCell>
          </TableRow>
        );
      });
    }
  };

  return (
    <React.Fragment>
      <Box className={classes.wholeContainer}>
        <Box display="flex" justifyContent="space-between">
          <div>
            <Box component="div" display="inline" className={classes.topbox}>
              <Assignment className={classes.whitecolor} />
            </Box>
            <Typography className={classes.containertitle} display="inline">
              Employee Details
            </Typography>
          </div>

          <div>
            <Button
              variant="outlinedPrimary" className={classes.addEmpBtn}
              onClick={() => setOpen(true)}
              endIcon={<LibraryAddIcon />}
            >
              Add Employee
            </Button>
          </div>
        </Box>
        <Paper className={classes.paper}>
          <TableContainer>
            <Table className={classes.table} aria-label="Employee Details">
              <TableHead>
                <TableRow>
                  <TableCell>Employee</TableCell>
                  <TableCell>Project</TableCell>
                  <TableCell>Resume</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{renderList()}</TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      <CustomModel open={open} handleClose={handleClose}>
        <AddProfile
          profileSubmit={profileSubmit}
          kpaCreation={props.kpaCreation}
        />
      </CustomModel>
    </React.Fragment>
  );
};

export default Profile;
