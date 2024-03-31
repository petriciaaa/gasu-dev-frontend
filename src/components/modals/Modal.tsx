import React from "react";
import Alert from "@mui/material/Alert";

const Modal = (props) => {
  const { message, severity } = props;
  return <Alert severity={severity}>{message}</Alert>;
};

export default Modal;
