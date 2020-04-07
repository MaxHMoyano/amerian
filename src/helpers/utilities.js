import React from "react";
import { components } from "react-select";

export const customValueContainer = ({ children, getValue, ...props }) => {
  const length = getValue().length;
  return (
    <components.ValueContainer {...props}>
      {/* <components.Placeholder {...props} isFocused={props.isFocused}>
        {props.selectProps.placeholder}
      </components.Placeholder> */}
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

function logout() {
  // remove user from local storage to log user out
  sessionStorage.removeItem("user");
}

export const handleResponse = (response) => {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
};

export const customSelectTheme = (theme) => ({ ...theme, colors: { ...theme.colors, primary: "#b20022" } });


export const phoneRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const globalDateFormat = "dd-MM-yyyy";