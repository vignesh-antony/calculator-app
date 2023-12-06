import React from "react";
import styled from "styled-components";
import { COLORS } from "../constants";
import { ColorType } from "../types";

export type ButtonVariantType = "solid" | "outline" | "ghost" | "text";

const StyledButton = styled.button<{
    $variant: ButtonVariantType;
    $color: ColorType;
}>`
    padding: 8px 16px;
    border: 1px solid transparent;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    transition: all ease-in-out 0.1s;
    user-select: none;
    outline: none;

    ${({ $variant, $color }) =>
        $variant === "solid" &&
        `
        background-color: ${COLORS[$color]?.[500]};
        color: #ffffff;

        &:hover, &:focus {
            background-color: ${COLORS[$color]?.[900]};
            box-shadow: inset 0 0 0 2px ${COLORS[$color]?.[500]};
        }
    `}

    ${({ $variant, $color }) =>
        $variant === "outline" &&
        `
        background-color: #ffffff;
        color: ${COLORS[$color]?.[500]};
        border-color: ${COLORS[$color]?.[500]};

        &:hover, &:focus {
            background-color:  ${COLORS[$color]?.[100]};
        }
    `}
`;

interface ButtonProps {
    label: string | number;
    disabled?: boolean;
    variant?: ButtonVariantType;
    color?: ColorType;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
    label = "Button Label",
    variant = "solid",
    color = "primary",
    disabled = false,
    onClick = () => null,
}) => {
    return (
        <StyledButton
            $variant={variant}
            $color={color}
            disabled={disabled}
            onClick={onClick}
        >
            {label}
        </StyledButton>
    );
};

export default Button;
