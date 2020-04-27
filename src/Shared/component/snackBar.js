import React, { useImperativeHandle, forwardRef } from "react";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CustomizedSnackbars(props, ref) {
  const [open, setOpen] = React.useState(props.open);
  const [content, setContent] = React.useState({
    message: "",
    variant: "success",
  });
  useImperativeHandle(ref, () => ({
    handleClick(message, color = "info") {
      // console.log("callled...");
      setContent({ message: message, variant: color });
      setOpen(true);
    },
  }));

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={content.variant}>
        {content.message}
      </Alert>
    </Snackbar>
  );
}

export default forwardRef(CustomizedSnackbars);
