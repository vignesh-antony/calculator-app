import {
    HIGH_PRIORITY_OPERATORS,
    ValueType,
    OPERATORS,
    CALC_ADDONS,
} from "./constants";

export const isOperator = (value: ValueType) =>
    Object.values(OPERATORS).includes(value as OPERATORS);

export const isHighPriorityOperator = (value: OPERATORS) =>
    HIGH_PRIORITY_OPERATORS.includes(value);

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

export const evaluateExpression = (
    pressedKeys: ValueType[] = []
): ValueType => {
    const numbers: number[] = [];
    const operators: OPERATORS[] = [];

    const handleOperation = () => {
        const operator = operators.pop();
        const secondNumber = numbers.pop() || 0;
        const firstNumber = numbers.pop() || 0;
        const result = performOperation(
            firstNumber,
            secondNumber,
            operator as OPERATORS
        );
        if (result !== null && result !== undefined) numbers.push(result);
    };

    for (const key of pressedKeys) {
        if (isOperator(key)) {
            while (
                operators.length &&
                isHighPriorityOperator(operators[operators.length - 1])
            ) {
                handleOperation();
            }
            operators.push(key as OPERATORS);
        } else {
            numbers.push(Number(key));
        }
    }

    while (operators.length) {
        handleOperation();
    }

    return numbers[0] ?? CALC_ADDONS.EMPTY;
};
