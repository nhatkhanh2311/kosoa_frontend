import React, {createContext, useState} from "react";

const SnackbarContext = createContext({
  open: false,
  message: "",
  severity: "",
  onSnackbar: (message, severity) => {},
  onHide: () => {}
});

export default SnackbarContext;

export const SnackbarProvider = (props) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const value = {
    open: open,
    message: message,
    severity: severity,
    onSnackbar: (message, severity) => {
      setOpen(true);
      setMessage(message);
      setSeverity(severity);
    },
    onHide: () => {
      setOpen(false);
    }
  }

  return (
    <SnackbarContext.Provider value={value}>
      {props.children}
    </SnackbarContext.Provider>
  );
}
