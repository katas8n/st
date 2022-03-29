import React from "react";

export const Button = ({ onClickHandler, children, cn = "button" }) => {
  return (
    <button onClick={onClickHandler} className={cn}>
      {children}
    </button>
  );
};
