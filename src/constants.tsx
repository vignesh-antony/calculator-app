import { CSSProperties } from "styled-components";
import { FaMinus, FaPlus, FaDivide, FaEquals, FaAngleUp } from "react-icons/fa";
import { ColorShade, ColorType, DisplayKeyType } from "./types";

export const COLORS: {
    [K in ColorType]?: { [C in ColorShade]?: CSSProperties["color"] };
} = {
    primary: {
        "100": "#e8e8ff",
        "500": "#676792",
        "700": "#2e2e44",
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
    NEGATE = "±",
}

export enum CALC_ADDONS {
    CLEAR = "Escape",
    DECIMAL = ".",
    EMPTY = "",
    BACKSPACE = "Backspace",
    ENTER = "Enter",
}

export const OPERATOR_ADDON_MAP: { [K in CALC_ADDONS]?: OPERATORS } = {
    [CALC_ADDONS.ENTER]: OPERATORS.EQUALS,
};

export const DISPLAY_KEYS: DisplayKeyType[] = [
    {
        label: "AC",
        value: CALC_ADDONS.CLEAR,
        buttonColor: "warning",
    },
    {
        label: "C",
        value: CALC_ADDONS.BACKSPACE,
        buttonColor: "secondary",
    },
    {
        label: <FaAngleUp size={14} />,
        value: OPERATORS.EXPONENT,
        buttonColor: "special",
    },
    {
        label: <FaDivide size={14} />,
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
        label: <FaPlus size={14} style={{ rotate: "45deg" }} />,
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
        label: <FaMinus size={14} />,
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
        label: <FaPlus size={14} />,
        value: OPERATORS.ADD,
        buttonColor: "special",
    },
    {
        label: "0",
        value: 0,
    },
    {
        label: ".",
        value: CALC_ADDONS.DECIMAL,
    },
    {
        label: "±",
        value: OPERATORS.NEGATE,
    },
    {
        label: <FaEquals size={14} />,
        value: OPERATORS.EQUALS,
        buttonColor: "error",
    },
];

export const HIGH_PRIORITY_OPERATORS = [
    OPERATORS.EXPONENT,
    OPERATORS.MODULUS,
    OPERATORS.MULTIPLY,
    OPERATORS.DIVIDE,
];
export const NEGATE_CONSTANT = -1;
export const MAX_NUM_INPUT_DIGITS = 15;
