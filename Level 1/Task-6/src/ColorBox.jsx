import React from "react";

const ColorBox = ({ color }) => {
  const boxStyle = {
    backgroundColor: color,
    width: "200px",
    height: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    fontSize: "18px",
    fontWeight: "bold",
    borderRadius: "8px",
  };

  return <div style={boxStyle}>This is {color}</div>;
};

export default ColorBox;
