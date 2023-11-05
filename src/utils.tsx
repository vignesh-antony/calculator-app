import { OPERATORS } from "./constants";

export const isOperator = (value: string | number) =>
    Object.values(OPERATORS).includes(value as OPERATORS);
