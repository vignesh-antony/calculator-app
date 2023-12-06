import { ButtonVariantType } from "./components/Button";

export type ColorType =
    | "primary"
    | "secondary"
    | "tertiary"
    | "warning"
    | "error"
    | "success"
    | "special";

export type ColorShade = "100" | "500" | "700" | "900";

export type ValueType = number | string;

export type HistoryType = {
    createdAt: number;
    evaluatedExpr: ValueType[];
    result: ValueType;
};

export interface DisplayKeyType {
    label: string;
    value: ValueType;
    buttonVariant?: ButtonVariantType;
    buttonColor?: ColorType;
}
