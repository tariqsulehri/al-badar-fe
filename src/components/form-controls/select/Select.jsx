import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "./Select.css";

function CustomSelect({ label, options = [], onChange, name, value, defaultValue }) {
  const resolvedValue =
    typeof value === "string"
      ? options.find((option) => option.label === value || option.value === value) || null
      : value || null;

  const resolvedDefaultValue =
    typeof defaultValue === "string"
      ? options.find((option) => option.label === defaultValue || option.value === defaultValue) || null
      : defaultValue || null;

  return (
    <div className="layout">
      <Autocomplete
        className="custom-select"
        size="medium"
        name={name}
        options={options}
        onChange={onChange}
        defaultValue={resolvedDefaultValue}
        value={resolvedValue}
        isOptionEqualToValue={(option, selected) => option.value === selected?.value}
        renderInput={(params) => <TextField {...params} size="medium" label={label} />}
      />
    </div>
  );
}

export default CustomSelect;
