  import React from "react";

const Error = ({sendError}) => {
  if (sendError === true) {
    throw new Error("Ha ocurrido un error");
  }

  return <h1></h1>
}

export default Error;