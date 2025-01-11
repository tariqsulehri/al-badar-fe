import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "./Select.css"

function CustomSelect({ label, options, width, onChange, name, value, defaultValue}) {
  return (
    <div className="layout">
      <Autocomplete
        className="custom-select"
        size="medium"
        name={name}
        options={options}
        onChange={onChange}
        defaultValue={defaultValue}
        value={value}
        renderInput={(params) => (
          <TextField
            {...params}
            size="medium"
            label={label}
            options={options}
            value={value}
            defaultValue={defaultValue}
          />
        )}
      />
    </div>
  );
}

export default CustomSelect;
