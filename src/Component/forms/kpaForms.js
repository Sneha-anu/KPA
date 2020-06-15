import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Typography,
  Button,
  Card,
  Divider,
  Box,
} from "@material-ui/core";
import { startCase, camelCase } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import { kpaModel } from "../../Shared/function/initialData";
const kpaChoices = kpaModel.map((el) => {
  return { label: el.name, value: el.name, stage: el.stage };
});
// const kpaChoices = [
//   {
//     label: "component",
//     value: "component",
//     stage: [{ label: "comp", value: "c" }],
//   },
// ];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: theme.spacing(3),
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
      width: "25ch",
    },
    "& .MuiButton-root": {
      margin: theme.spacing(3),
      width: "15ch",
    },
  },
  textArea: {
    margin: theme.spacing(3),
    width: "85%",
    padding: theme.spacing(1),
  },
  divider: { marginTop: theme.spacing(2) },
}));

const KpaForm = (props) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    title: { required: true, value: props.title },
    name: { required: true, value: props.name },
    type: { required: true, value: props.type },
    description: { required: true, value: props.description },
    stage: { required: true, value: props.stage },
  });

  const renderStage = (type = "") => {
    let choice = kpaChoices.find((el) => el.value === type);
    choice = choice ? choice.stage : [{ label: "Select Stage", value: "" }];
    return choice.map((el) => (
      <MenuItem key={el.id + el.title} value={el.id}>
        {el.title}
      </MenuItem>
    ));
  };

  const handleChange = (event) => {
    const id = event.target.name;
    const value = event.target.value;
    setFormData((state, props) => {
      const property = state[id];
      return { ...state, [id]: { ...property, value: value } };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    let result = {
      title: formData.title.value,
      type: formData.type.value,
      description: formData.description.value,
      stage: formData.stage.value,
    };
    props.profileSubmit(result);
  };
  return (
    <React.Fragment>
      <Card>
        <form className={classes.root} noValidate autoComplete="off">
          <Box flexGrow={1} mb={2} px={5} style={{ width: "100%" }}>
            <Typography variant="h6">Kpa Details</Typography>
            <Divider className={classes.divider} />
          </Box>
          <TextField
            required
            id="name"
            label="Full Name"
            variant="outlined"
            value={formData.name.value}
            onChange={handleChange}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            required
            id="type"
            select
            value={formData.type.value}
            label="Kpa Type"
            name="type"
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          >
            {kpaChoices.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {startCase(camelCase(option.label))}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            id="title"
            name="title"
            label="Kpa Title"
            onChange={handleChange}
            value={formData.title.value}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
          <TextField
            required
            id="stage"
            select
            name="stage"
            value={formData.stage.value}
            label="Kpa Stage"
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          >
            {renderStage(formData.type.value)}
          </TextField>
          <TextareaAutosize
            className={classes.textArea}
            rowsMin={3}
            id="description"
            name="description"
            placeholder="Description"
            value={formData.description.value}
            onChange={handleChange}
          />

          <Box>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
            {props.stage && (
              <Button
                variant="contained"
                color="secondary"
                onClick={props.handleDelete}
              >
                Delete
              </Button>
            )}
            <Button
              variant="contained"
              color="secondary"
              onClick={props.handleClose}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default KpaForm;

KpaForm.defaultProps = {
  title: "",
  stage: "",
  description: "",
  type: "",
};
