import React, { useEffect } from "react";

const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    //setting up time out for alert
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000); //of 3 sec
    return () => clearTimeout(timeout);
  }, [list]);
  //type of alert i.e danger or success
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
