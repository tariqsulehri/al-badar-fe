import { TextField } from "@mui/material";

import Stylesheet from "reactjs-stylesheet";
import PropTypes from "prop-types";

const styles = Stylesheet.create({
  textFld: {
    padding: "3px",
    marginBottom: "10px",
    fontSize: 13,
  },
});

const InputField = ({
  id,
  name,
  rows = 1,
  type = "text",
  ...otherProps
}) => {
  
  return (
    <div>
      <TextField
        className={styles.textFld}
        variant="outlined"
        size="medium"
        rows={rows}
        inputProps={{ style: { fontSize: styles.textFld.fontSize,  shrink:true } }}
        InputLabelProps={{ style: { fontSize: styles.textFld.fontSize } }}
        id={id}
        name={name}
        type={type}
        fullWidth
        {...otherProps}
      />
    </div>
  );
};

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  rows: PropTypes.number,
  type: PropTypes.string,
};

InputField.defaultProps = {
  rows: 1,
  type: "text",
};

export default InputField;
