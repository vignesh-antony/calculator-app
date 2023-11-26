import { OPERATORS } from "./constants";

export const isOperator = (value: string | number) =>
    Object.values(OPERATORS).includes(value as OPERATORS);

export const performOperation = (
    firstOperand: number,
    secondOperand: number,
    operator: OPERATORS
) => {
    try {
        switch (operator) {
            case OPERATORS.ADD: {
                return firstOperand + secondOperand;
            }
            case OPERATORS.SUBTRACT: {
                return firstOperand - secondOperand;
            }
            case OPERATORS.MULTIPLY: {
                return firstOperand * secondOperand;
            }
            case OPERATORS.DIVIDE: {
                return firstOperand / secondOperand;
            }
            case OPERATORS.MODULUS: {
                return firstOperand % secondOperand;
            }
            case OPERATORS.EXPONENT: {
                return firstOperand ^ secondOperand;
            }
            default: {
                return 0;
            }
        }
    } catch (error: any) {
        console.warn(
            `Error occured while performing operation -> ${error.message}`
        );
    }
};

export const evaluateExpression = (pressedKeys: (string | number)[] = []) => {
    const [numbers, operators] = [[], []];
    pressedKeys.forEach((key) => {
        if (isOperator(key)) {
            // TODO: continue the logic
        }
    });
};
