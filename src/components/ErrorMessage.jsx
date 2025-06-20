import React from "react";

const ErrorMessage = ({ message }) => {
  const errorMessage =
    message instanceof window.Error ? message.message : message;
  return <span className=" text-sm text-red-400">{errorMessage}</span>;
};

export default ErrorMessage;
