import React from "react";

const Button = ({ onClick, text, type }) => {
  return <button onClick={onClick}>{text}</button>;
};

export default Button;
