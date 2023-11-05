import React, { useState, useEffect } from "react";
import rgbToHex from "./utils";

const SingleColor = ({ rgb, weight, index, hexColor }) => {
  const [alert, setAlert] = useState(false);
  //background color
  const bcg = rgb.join(",");
  const hex = rgbToHex(...rgb);
  //getting the hex values from utils
  const hexValue = `#${hexColor}`; //template strings
  useEffect(() => {
    //setting timeout for siapperaing of "copied to clipboard" msg
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 3000); //set alert as false after 3 sec
    return () => clearTimeout(timeout); //cleanup function
  }, [alert]);
  return (
    <article
      //changing the color value of text as the color gets darker by assigning it to class only when index>10
      className={`color ${index > 10 && "color-light"}`}
      style={{ backgroundColor: `rgb(${bcg})` }}
      //on clicking the color box, hex value should get copied to clipboard
      onClick={() => {
        //setting alert as true
        setAlert(true);
        //function to copy to clipboard
        navigator.clipboard.writeText(hexValue);
      }}
    >
      <p className="percent-value">{weight}%</p>
      <p className="color-value">{hexValue}</p>
      {/* setting up alert for copying the hex value */}
      {/* if alert is true, display"copied to clipboard" */}
      {alert && <p className="alert">copied to clipboard</p>}
    </article>
  );
};

export default SingleColor;
