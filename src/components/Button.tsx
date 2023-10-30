import React from "react";
import styled from "styled-components";

type ButtonVaraintType = "filled" | "outlined";

const StyledButton = styled.button<{ $variant: ButtonVaraintType }>`
    padding: 8px 16px;
    background-color: ${({ $variant }) =>
        $variant === "filled" ? "#008a6c" : "#ffffff"};
    border: 1px solid #008a6c;
    border-radius: 8px;
    cursor: pointer;
    color: ${({ $variant }) =>
        $variant === "outlined" ? "#008a6c" : "#ffffff"};
    font-size: 16px;
    font-weight: 500;
    transition: all ease-in-out 0.1s;
    user-select: none;

    &:hover {
        background-color: ${({ $variant }) =>
            $variant === "outlined" ? "#008a6c" : "#ffffff"};
        color: ${({ $variant }) =>
            $variant === "filled" ? "#008a6c" : "#ffffff"};
    }
`;

interface ButtonProps {
    label: string;
    disabled?: boolean;
    variant?: ButtonVaraintType;
}

const Button: React.FC<ButtonProps> = ({
    label = "Button Label",
    variant = "filled",
    disabled = false,
}) => {
    return (
        <StyledButton $variant={variant} disabled={disabled}>
            {label}
        </StyledButton>
    );
};

export default Button;
