import React from "react";

import "./Form.scss";

export const Form = ({ children, cn = "form" }) => {
  return <form className={cn}>{children}</form>;
};
