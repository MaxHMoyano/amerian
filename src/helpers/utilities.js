import React from "react";
import { components } from "react-select";

export const customValueContainer = ({ children, getValue, ...props }) => {
  const length = getValue().length;
  return (
    <components.ValueContainer {...props}>
      <components.Placeholder {...props} isFocused={props.isFocused}>
        {props.selectProps.placeholder}
      </components.Placeholder>
      {length !== props.options.length
        ? length
          ? `${length} Seleccion${length !== 1 ? "es" : ""}`
          : ""
        : "Todos"}
      {React.cloneElement(children[1])}
    </components.ValueContainer>
  );
};
