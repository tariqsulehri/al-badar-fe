
import React from "react";
import { Button } from "@mui/material"

const CustomButton = ({ type, id, name, label, handleClick }) => {
    return (
        <Button
            id={id}
            name={name}
            type={type}
            style={{ width: "150px", height:"40px", margin:"4px" }}
            variant="contained"
            onClick={handleClick}
        >
            {label}
        </Button>
    );
};


export default CustomButton;