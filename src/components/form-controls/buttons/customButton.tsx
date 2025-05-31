import React from "react";
import { Button, styled, ButtonProps } from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({
    minWidth: "120px",
    height: "36px",
    margin: "4px",
    textTransform: "none",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: 500,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        transform: "translateY(-1px)"
    },
    "&:active": {
        transform: "translateY(0)",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
    }
}));

interface CustomButtonProps extends Omit<ButtonProps, 'variant' | 'color'> {
    variant?: 'text' | 'contained' | 'outlined';
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    label: string;
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ 
    type, 
    id, 
    name, 
    label, 
    handleClick, 
    variant = "contained", 
    color = "primary",
    ...props 
}) => {
    return (
        <StyledButton
            id={id}
            name={name}
            type={type}
            variant={variant}
            color={color}
            onClick={handleClick}
            {...props}
        >
            {label}
        </StyledButton>
    );
};

export default CustomButton;