import React from "react";
import { Typography } from "@material-ui/core";
const Profile = props => {
  return (
    <Typography variant="h5" color="primary" component="h2">
      {props.id}
    </Typography>
  );
};

export default Profile;
Profile.defaultProps = {
  name: "Dinesh S",
  project_manager: "Johnson A",
  mail: "dinesh@tech.com"
};
