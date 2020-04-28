import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Typography,
  Button,
  Divider,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const designations = [
  {
    value: "LE",
    label: "Lead Engineer",
  },
  {
    value: "TL",
    label: "Tech Lead",
  },
  {
    value: "SE",
    label: "Software Engineer",
  },
  {
    value: "TM",
    label: "Manager",
  },
];

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

  divider: { marginTop: theme.spacing(2) },
}));

const FormData = (props) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    empId: { required: true, value: "" },
    name: { required: true, value: "" },
    contact: { required: true, value: "" },
    mail: { required: true, value: "" },
    manager: { required: true, value: "" },
    designation: { required: true, value: "" },
    project_name: { required: false, value: "" },
    project_manager: { required: false, value: "" },
    project_mail: { required: false, value: "" },
    project_contact: { required: false, value: "" },
  });

  //   const [designation, setDesignation] = useState("");

  const handleChangeDesignation = (event) => {
    const value = event.target.value;
    setFormData((state, props) => {
      const property = state["designation"];
      return { ...state, designation: { ...property, value: value } };
    });
  };

  const handleChange = (event) => {
    const id = event.target.id;
    const value = event.target.value;
    setFormData((state, props) => {
      const property = state[id];
      return { ...state, [id]: { ...property, value: value } };
    });
  };
  const handleSubmit = (e) => {
    let target = {};
    props.kpaCreation.forEach((el) => {
      const val = el.target.find(
        (event) => event.role === formData.designation.value
      )["target"];
      target[el.name] = val;
    });
    e.preventDefault();
    let result = {
      empId: formData.empId.value,
      name: formData.name.value,
      contact: formData.contact.value,
      mail: formData.mail.value,
      manager: formData.manager.value,
      designation: formData.designation.value,
      project_details: {
        name: formData.project_name.value,
        project_manager: formData.project_manager.value,
        mail: formData.project_mail.value,
        contact: formData.project_contact.value,
      },
      target_kpa: target,
    };
    if (formData.project_name.value === "") {
      result = { ...result, project_details: {} };
    }
    // console.log(target, "Target", result);
    axios
      .post("https://kpa-backend.herokuapp.com/user", result)
      .then((res) => {
        props.profileSubmit(result);
      })
      .catch((err) => console.log(err));
    // props.profileSubmit(result);
  };
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Box flexGrow={1} mb={2} px={5} style={{ width: "100%" }}>
        <Typography variant="h6">Personal Details</Typography>
        <Divider className={classes.divider} />
      </Box>

      <TextField
        required
        id="name"
        label="Full Name"
        variant="outlined"
        value={formData.name.value}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        required
        id="empId"
        label="Employee Id"
        onChange={handleChange}
        value={formData.empId.value}
        InputLabelProps={{ shrink: true }}
        variant="outlined"
      />
      <TextField
        required
        id="manager"
        value={formData.manager.value}
        label="Project Manager"
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        variant="outlined"
      />
      <TextField
        required
        id="designation"
        select
        value={formData.designation.value}
        label="Designation"
        onChange={handleChangeDesignation}
        InputLabelProps={{ shrink: true }}
        variant="outlined"
      >
        {designations.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      {/* <Grid item xs={4}> */}
      <TextField
        required
        id="contact"
        value={formData.contact.value}
        label="Contact"
        type="number"
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
      {/* </Grid> */}
      <TextField
        id="mail"
        label="Email Id"
        type="Email"
        value={formData.mail.value}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        variant="outlined"
      />
      <Box flexGrow={1} mb={2} px={5} style={{ width: "100%" }}>
        <Typography variant="h6">Project Details</Typography>
        <Divider className={classes.divider} />
      </Box>

      <TextField
        id="project_name"
        label="Name"
        value={formData.project_name.value}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
      <TextField
        id="project_manager"
        label="Manager Name"
        value={formData.project_manager.value}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        id="project_mail"
        label="Contact"
        value={formData.project_mail.value}
        type="number"
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        variant="outlined"
      />
      <TextField
        id="project_contact"
        label="Email Id"
        value={formData.project_contact.value}
        type="Email"
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        variant="outlined"
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
        <Button variant="contained" color="secondary" onClick={props.handleClose}>
          Cancel
        </Button>
      </Box>
    </form>
  );
};

export default FormData;
