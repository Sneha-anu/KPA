import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory, useLocation } from "react-router-dom";
import { fakeAuth } from "../../service/auth";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    "& .MuiTextField-root": {
      margin: theme.spacing(2, 1),
      width: "35ch",
    },
  },
  form: {
    border: "2px solid white",
    borderRadius: "15px",
    backgroundColor: "white",
    // color: "white",
    width: "500px",
    height: "320px",
    textAlign: "center",
  },
  button: {
    display: "block",
    margin: "auto",
  },
  error: {
    color: "red",
    fontSize: "12px",
    margin: theme.spacing(0, 0, 1),
  },
  content: {
    marginTop: theme.spacing(1.5),
    padding: theme.spacing(0, 1, 2),
  },
  title: {
    background: "black",
    borderRadius: "15px 15px 0 0",
    padding: " 10px",
    color: "white",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  img: {
    height: "30px",
    textAlign: "center",
    // lineHeight: "33px",
  },
}));
const LoginForm = (props) => {
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
    error: "",
  });
  const [invalid, setInvalid] = useState(false);
  const classes = useStyles();
  let history = useHistory();
  let location = useLocation();
  //   console.log(location, "locat", props);
  let { from } = location.state || { from: { pathname: "/" } };
  //   console.log(from, "from");
  const login = () => {
    // console.log("aith");
    fakeAuth.authenticate(() => {
      history.replace(from);
    });
  };

  const handleChange = (event) => {
    event.persist();
    // console.log(event.target);
    setFormValue((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    if (formValue["username"].length < 1) {
      setError("username");
      return false;
    }
    if (formValue["password"].length < 1) {
      setError("password");
      return false;
    }

    if (
      formValue["password"] === "admin" &&
      formValue["username"] === "admin"
    ) {
      login();
    } else {
      setInvalid(true);
    }
  };

  const setError = (arg) => {
    setFormValue((prevState) => ({
      ...prevState,
      error: arg,
    }));
  };
  //   console.log(fakeAuth.isAuthenticated);
  return (
    <div className={classes.root}>
      <form className={classes.form} autoComplete="off">
        <Box className={classes.title}>
          <img className={classes.img} src="/KPA-Logo.svg" alt="KPA Tracker" />
          <Typography variant="h6" mr={2}>
            Login
          </Typography>
        </Box>

        <div className={classes.content}>
          <TextField
            id="username"
            name="username"
            label="Username"
            type="text"
            autoFocus
            required
            InputLabelProps={{
              shrink: true,
            }}
            error={formValue.error === "username"}
            onChange={handleChange}
            value={formValue.user}
            placeholder="admin"
            variant="outlined"
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            required
            InputLabelProps={{
              shrink: true,
            }}
            value={formValue.password}
            error={formValue.error === "password"}
            placeholder="******"
            variant="outlined"
            onChange={handleChange}
          />
          {invalid && (
            <div className={classes.error}>Username or password invalid</div>
          )}
          <Button
            variant="outlined"
            onClick={handleSubmit}
            className={classes.button}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
