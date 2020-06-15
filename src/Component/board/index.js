import React, { useState, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Box, Button } from "@material-ui/core";
// import { CSVLink } from "react-csv";
import { startCase, camelCase } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import NativeSelect from "@material-ui/core/NativeSelect";
import queryString from "query-string";
import { find, isEmpty } from "lodash";
import { FilterBYType, FilterByName } from "../../Shared/function";
import RowList from "./rowList";
import SnackBar from "../../Shared/component/snackBar";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
// import TitleHeaders from "./titleBoard";
import { FormLabel, Typography } from "@material-ui/core";
import { fetchUsersWithKpa } from "../../service/apiService";
import BackDrop from "../../Shared/component/backDrop";
import CustomModel from "../../Shared/component/customModel";
import KpaForm from "../forms/kpaForms";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
  selectEmpty: {
    margin: theme.spacing(2),
  },
}));

const Dashboard = (props) => {
  let history = useHistory();
  let location = useLocation();
  const queryParam = queryString.parse(location.search);
  const [showBy, setshowBy] = useState({ type: "" });
  const [data, setData] = useState({ profile: [], kpaCreation: [] });
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const snackBarRef = useRef();

  const handleChange = (event) => {
    const name = event.target.name;
    setshowBy({
      [name]: event.target.value,
    });
    history.push({
      pathname: "/kpa-profile",
      search: `?${"type"}=${queryParam["type"]}&&${"value"}=${
        event.target.value
      }`,
    });
  };

  async function changeStage(result) {
    setIsLoading(true);
    const event = result["draggableId"].split("~");
    let changeArr = {};
    data.profile
      .filter((el) => el.empId === event[0])
      .map((user) => {
        return user.kpa
          .filter((list) => list.type === event[2] && list.title === event[1])
          .map((fl) => {
            changeArr = {
              ...fl,
              stage: result.destination.droppableId,
              modified_on: new Date().toJSON(),
              empId: user.empId,
            };
          });
      });

    console.log(changeArr, "Casdfa dsg");
    try {
      const res = await Axios.put(
        `https://kpa-backend.herokuapp.com/kpa/${changeArr.empId}?kpaId=${changeArr._id}`,
        changeArr
      );
      window.location.reload();
      snackBarRef.current.handleClick(
        `Profile ${event[0]} updated Successfully`,
        "success"
      );
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        snackBarRef.current.handleClick(error.message, "error");
        console.log(error.toJSON());
      }
    }
    setIsLoading(false);
  }

  async function fetchData() {
    setIsLoading(true);
    try {
      const [profile, kpaCreation] = await fetchUsersWithKpa();
      setData({ profile: profile.data, kpaCreation: kpaCreation.data });
      if (queryParam["type"] === "name") {
        setOptions(
          profile.data.map((el) => {
            return { id: el.empId, value: el.name };
          })
        );
        setshowBy({ type: queryParam.value });
      } else if (queryParam["type"] === "kpa") {
        profile.data.forEach((element) => {
          setOptions(
            Object.keys(element.target_kpa).map((el) => {
              return { id: el, value: el };
            })
          );
          setshowBy({ type: queryParam.value });
        });
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        snackBarRef.current.handleClick(error.message, "error");
        console.log(error.toJSON());
      }
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [queryParam["type"]]);

  const record =
    queryParam["type"] === "name"
      ? FilterByName(data, showBy.type)
      : FilterBYType(data, showBy.type);

  const profileSubmit = async (arg) => {
    console.log(arg);
    const id = isEmpty(titleKpa) ? "" : titleKpa.id;
    try {
      const res = await Axios.post(
        `https://kpa-backend.herokuapp.com/kpa/${id}`,
        arg
      );
      setOpen(false);
      fetchData();
      snackBarRef.current.handleClick(
        `Profile ${titleKpa.value} updated Successfully`,
        "success"
      );
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        snackBarRef.current.handleClick(error.message, "error");
        console.log(error.toJSON());
      }
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const renderList = () => {
    return record.map((list) => {
      // console.log(list, "render");
      return (
        <Box m={1} key={list[0] + showBy.type}>
          <RowList
            data={list[1]}
            name={list[0]}
            id={list[3]}
            type={queryParam["type"]}
            changeStage={changeStage}
            status={list[2]}
          />
        </Box>
      );
    });
  };

  const titleKpa = find(options, (el) => el.id == queryParam["value"]);
  // console.log(titleKpa);
  return (
    <React.Fragment>
      {/* <CSVLink
        className="card bg-warning text-light p-3 mb-2"
        data={initialData}
        headers={headers}
      >
        Click me to Download CSV Format
      </CSVLink>*/}
      <Box
        borderRadius="borderRadius"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        m={1}
        px={2}
        // bgcolor="background.paper"
      >
        <Typography variant="h6" component="h6">
          {isEmpty(titleKpa) ? "" : startCase(camelCase(titleKpa.value))} KPA
          Board
        </Typography>
        <div>
          {queryParam["type"] === "name" && (
            <Button
              variant="outlined"
              style={{ marginRight: "15px" }}
              onClick={() => setOpen(true)}
              endIcon={<LibraryAddIcon />}
            >
              Add Kpa
            </Button>
          )}
          <FormLabel>Show By</FormLabel>
          <NativeSelect
            value={showBy.type}
            onChange={handleChange}
            name="type"
            className={classes.selectEmpty}
            inputProps={{ "aria-label": "age" }}
          >
            {options.map((el) => (
              <option key={el.id} value={el.id}>
                {startCase(camelCase(el.value))}
              </option>
            ))}
          </NativeSelect>
        </div>
      </Box>

      {/* <TitleHeaders titleTopic={titleTopic} /> */}
      {isLoading && <BackDrop open={isLoading} />}
      {renderList()}
      <SnackBar ref={snackBarRef} />
      {queryParam["type"] === "name" && (
        <CustomModel open={open} handleClose={handleClose}>
          <KpaForm
            profileSubmit={profileSubmit}
            name={isEmpty(titleKpa) ? "" : titleKpa.value}
            handleClose={handleClose}
          />
        </CustomModel>
      )}
      {/* {isLoading ? <BackDrop open={isLoading} /> : renderList()} */}
    </React.Fragment>
  );
};

export default Dashboard;
