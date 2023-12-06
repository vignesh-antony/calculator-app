import {
    HIGH_PRIORITY_OPERATORS,
    OPERATORS,
    CALC_ADDONS,
    NEGATE_CONSTANT,
} from "./constants";
import { ValueType } from "./types";

export const isOperator = (value: ValueType) =>
    Object.values(OPERATORS).includes(value as OPERATORS);

export const isCalcAddons = (value: ValueType) =>
    Object.values(CALC_ADDONS).includes(value as CALC_ADDONS);

export const isHighPriorityOperator = (value: OPERATORS) =>
    HIGH_PRIORITY_OPERATORS.includes(value);

export const getPressedKeyType = (value: ValueType) => {
    return {
        isEqualsKey: value === OPERATORS.EQUALS,
        isClearKey: value === CALC_ADDONS.CLEAR,
    };
};

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
                return Math.pow(firstOperand, secondOperand);
            }
            case OPERATORS.NEGATE: {
                return firstOperand * NEGATE_CONSTANT;
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

    const getHigherOperationParams = () => {
        const operator = operators.pop();
        const secondNumber = numbers.pop() || 0;
        const firstNumber = numbers.pop() || 0;
        return {
            firstNumber,
            secondNumber,
            operator,
        };
    };

    const getLowerOperationParams = () => {
        const operator = operators.shift();
        const firstNumber = numbers.shift() || 0;
        const secondNumber = numbers.shift() || 0;
        return {
            operator,
            firstNumber,
            secondNumber,
        };
    };

    const handleOperation = ({ isHigherOperation = true }) => {
        const { firstNumber, secondNumber, operator } = isHigherOperation
            ? getHigherOperationParams()
            : getLowerOperationParams();
        const result = performOperation(
            firstNumber,
            secondNumber,
            operator as OPERATORS
        );
        if (result !== null && result !== undefined)
            isHigherOperation ? numbers.push(result) : numbers.unshift(result);
    };

    const performHigherOperations = () => {
        while (
            operators.length &&
            isHighPriorityOperator(operators[operators.length - 1])
        ) {
            handleOperation({ isHigherOperation: true });
        }
    };

    /** Performs lower order operations from left to right */
    const performLowerOperations = () => {
        while (operators.length) {
            handleOperation({ isHigherOperation: false });
        }
    };

    for (const key of pressedKeys) {
        if (isOperator(key)) {
            performHigherOperations();
            operators.push(key as OPERATORS);
        } else {
            numbers.push(Number(key));
        }
    }

    performHigherOperations();
    performLowerOperations();

    return Number(numbers[0].toFixed(10)) ?? 0;
};
