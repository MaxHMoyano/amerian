import React from "react";
import { components } from "react-select";

export const customValueContainer = ({ children, getValue, ...props }) => {
  const length = getValue().length;
  return (
    <components.ValueContainer {...props}>
      <components.Placeholder {...props} isFocused={props.isFocused}>
        {props.selectProps.placeholder}
      </components.Placeholder>
      {
        length === 1 ? props.selectProps.value[0].label : length !== props.options.length
          ? length
            ? `${length} Selecciones`
            : ""
          : "Todos"
      }
      {React.cloneElement(children[1])}
    </components.ValueContainer>
  );
};

export const customSelectTheme = (theme) => ({ ...theme, colors: { ...theme.colors, primary: "#b20022" } });