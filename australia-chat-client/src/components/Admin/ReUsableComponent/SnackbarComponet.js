import React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const SnackbarComponet = (props) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    props.setOpen(false);
  };
//   console.clear()
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={props.open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        {props.severity === "error" ? (
          <Alert severity="error" sx={{ width: "100%" }}>
            {props.message}
          </Alert>
        ) : props.severity === "warning" ? (
          <Alert severity="warning" sx={{ width: "100%" }}>
            {props.message}
          </Alert>
        ) : props.severity === "info" ? (
          <Alert severity="info" sx={{ width: "100%" }}>
            {props.message}
          </Alert>
        ) : props.severity === "success" ? (
          <Alert severity="success" sx={{ width: "100%" }}>
            {props.message}
          </Alert>
        ) : (
          ""
        )}
      </Snackbar>
    </Stack>
  );
};
export default SnackbarComponet;
