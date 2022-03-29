import React from "react";

export const Input = ({
  type = "text",
  placeholder,
  onChangeHandler,
  cn,
  onSubmitHandler,
  value,
  checked,
}) => {
  return (
    <input
      checked={checked}
      onClick={onSubmitHandler}
      type={type}
      placeholder={placeholder}
      onChange={onChangeHandler}
      className={cn}
      value={value}
    />
  );
};
