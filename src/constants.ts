import { CSSProperties } from "styled-components";
import { ButtonVariantType } from "./components/Button";

export type ColorType =
    | "primary"
    | "secondary"
    | "tertiary"
    | "warning"
    | "error"
    | "success"
    | "special";

export type ColorShade = "100" | "500" | "900";

interface DisplayKeyType {
    label: string;
    value: string | number;
    buttonVariant?: ButtonVariantType;
    buttonColor?: ColorType;
}

export const COLORS: {
    [K in ColorType]?: { [C in ColorShade]?: CSSProperties["color"] };
} = {
    primary: {
        "100": "#e8e8ff",
        "500": "#676792",
        "900": "#1c1c29",
    },
    secondary: {
        "100": "#ffe8fc",
        "500": "#bb2aa3",
        "900": "#640760",
    },
    warning: {
        "100": "#fdf6cd",
        "500": "#bea512",
        "900": "#524007",
    },
    error: {
        "100": "#fdcdcd",
        "500": "#c53d3d",
        "900": "#7a0a0a",
    },
    success: {
        "100": "#cdfdcf",
        "500": "#31a536",
        "900": "#064e10",
    },
    special: {
        "100": "#cde3fd",
        "500": "#315aa5",
        "900": "#061f4e",
    },
};

export enum OPERATORS {
    ADD = "+",
    SUBTRACT = "-",
    MULTIPLY = "*",
    DIVIDE = "/",
    EXPONENT = "^",
    MODULUS = "%",
    EQUALS = "=",
    NEGATE = "+-",
}

export const DISPLAY_KEYS: DisplayKeyType[] = [
    {
        label: "C",
        value: "C",
        buttonColor: "warning",
    },
    {
        label: "^",
        value: OPERATORS.EXPONENT,
        buttonColor: "special",
    },
    {
        label: "%",
        value: OPERATORS.MODULUS,
        buttonColor: "special",
    },
    {
        label: "/",
        value: OPERATORS.DIVIDE,
        buttonColor: "special",
    },
    {
        label: "7",
        value: 7,
    },
    {
        label: "8",
        value: 8,
    },
    {
        label: "9",
        value: 9,
    },
    {
        label: "*",
        value: OPERATORS.MULTIPLY,
        buttonColor: "special",
    },
    {
        label: "4",
        value: 4,
    },
    {
        label: "5",
        value: 5,
    },
    {
        label: "6",
        value: 6,
    },
    {
        label: "-",
        value: OPERATORS.SUBTRACT,
        buttonColor: "special",
    },
    {
        label: "1",
        value: 1,
    },
    {
        label: "2",
        value: 2,
    },
    {
        label: "3",
        value: 3,
    },
    {
        label: "+",
        value: OPERATORS.ADD,
        buttonColor: "special",
    },
    {
        label: "0",
        value: 0,
    },
    {
        label: ".",
        value: ".",
    },
    {
        label: "+/-",
        value: OPERATORS.NEGATE,
    },
    {
        label: "=",
        value: OPERATORS.EQUALS,
        buttonColor: "error",
    },
];
