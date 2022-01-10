import React, {forwardRef, useContext} from "react";
import snackbarContext from "../stores/snackbar-context";
import {Alert, Snackbar} from "@mui/material";

const SuperAlert = forwardRef(function SuperAlert(props, ref) {
  return <Alert elevation={6} ref={ref} variant="filled" {...props}/>
});

function SnackbarMessage() {
  const sbCtx = useContext(snackbarContext);

  return (
    <Snackbar open={sbCtx.open} autoHideDuration={5000}
              anchorOrigin={{vertical: "bottom", horizontal: "center"}}
              onClose={sbCtx.onHide}>
      <SuperAlert severity={sbCtx.severity} onClose={sbCtx.onHide}>
        {sbCtx.message}
      </SuperAlert>
    </Snackbar>
  );
}

export default SnackbarMessage;
