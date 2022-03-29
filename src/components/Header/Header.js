import React from "react";

import "./Header.scss";

export const Header = ({ children, style }) => {
  return (
    <header style={style} className="header">
      {children}
    </header>
  );
};
