import { useState, useEffect, useCallback } from "react";
import {
    OPERATORS,
    CALC_ADDONS,
    OPERATOR_ADDON_MAP,
    MAX_NUM_INPUT_DIGITS,
} from "../constants";
import {
    isOperator,
    isCalcAddons,
    performOperation,
    evaluateExpression,
} from "../utils";
import { HistoryType, ValueType } from "../types";

const useCalculator = () => {
    const [currentValue, setCurrentValue] = useState<string | number>(
        CALC_ADDONS.EMPTY
    );
    const [pressedKeys, setPressedKeys] = useState<ValueType[]>([]);
    const [history, setHistory] = useState<HistoryType[]>([]);

    const saveToHistory = (result: ValueType, keysPressed: ValueType[]) => {
        setHistory((prev) => [
            {
                createdAt: Date.now(),
                result,
                evaluatedExpr: keysPressed,
            },
            ...prev,
        ]);
    };

    const handleKeyClick = useCallback(
        (value: ValueType) => {
            const lastPressedKey = pressedKeys.at(-1) || CALC_ADDONS.EMPTY;
            const isLastOperator = isOperator(lastPressedKey);
            const hasDecimalPoint = `${lastPressedKey}`.includes(
                CALC_ADDONS.DECIMAL
            );

            const handleEquals = () => {
                const keysPressed =
                    isLastOperator || hasDecimalPoint
                        ? pressedKeys.slice(0, -1)
                        : pressedKeys;
                const exprKeys = hasDecimalPoint
                    ? [...keysPressed, Number(lastPressedKey)]
                    : keysPressed;

                if (exprKeys.length <= 1) return;

                const result = evaluateExpression(exprKeys) || 0;

                setCurrentValue(result);
                setPressedKeys([result, value]);

                saveToHistory(result, exprKeys);
            };

            const handleClear = () => {
                setCurrentValue(CALC_ADDONS.EMPTY);
                setPressedKeys([]);
            };

            const handleBackspace = () => {
                const prefixString = `${lastPressedKey}`.slice(0, -1);
                // Handling [-1 -> -] and [-0. -> -0] scenarios when backspacing
                const truncatedValue = /-(0|$)/.test(prefixString)
                    ? CALC_ADDONS.EMPTY
                    : prefixString;

                setCurrentValue(
                    (isLastOperator ? pressedKeys.at(-2) : truncatedValue) ||
                        pressedKeys.at(-3) ||
                        CALC_ADDONS.EMPTY
                );
                setPressedKeys((prev) => {
                    const remainingKeys = prev.slice(0, -1);
                    return isLastOperator || !truncatedValue
                        ? remainingKeys
                        : [...remainingKeys, truncatedValue];
                });
            };

            const handleNegation = () => {
                if (isLastOperator) return;
                const negatedValue =
                    performOperation(
                        Number(lastPressedKey),
                        NaN,
                        OPERATORS.NEGATE
                    ) ?? 0;

                setCurrentValue(negatedValue);
                setPressedKeys((prev) => {
                    const prevKeys = prev.slice(0, -1);
                    return [...prevKeys, negatedValue];
                });
            };

            const handleDecimal = () => {
                if (isLastOperator || hasDecimalPoint) return;
                const decimalValue = `${
                    lastPressedKey || 0
                }${value}` as ValueType;

                setCurrentValue(decimalValue);
                setPressedKeys((prev) => {
                    const prevKeys = prev.slice(0, -1);
                    return [...prevKeys, decimalValue];
                });
            };

            if (isOperator(value) || isCalcAddons(value)) {
                if (!lastPressedKey && value !== CALC_ADDONS.DECIMAL) return;
                switch (value) {
                    case OPERATORS.EQUALS: {
                        handleEquals();
                        break;
                    }
                    case CALC_ADDONS.CLEAR: {
                        handleClear();
                        break;
                    }
                    case CALC_ADDONS.BACKSPACE: {
                        handleBackspace();
                        break;
                    }
                    case OPERATORS.NEGATE: {
                        handleNegation();
                        break;
                    }
                    case CALC_ADDONS.DECIMAL: {
                        handleDecimal();
                        break;
                    }
                    default: {
                        if (!isLastOperator && hasDecimalPoint)
                            setCurrentValue(Number(lastPressedKey));
                        setPressedKeys((prev) => {
                            const prevKeys =
                                isLastOperator || hasDecimalPoint
                                    ? prev.slice(0, -1)
                                    : prev;
                            const keysPressed = hasDecimalPoint
                                ? [...prevKeys, Number(lastPressedKey)]
                                : prevKeys;
                            return [...keysPressed, value];
                        });
                    }
                }
            } else {
                if (
                    !(lastPressedKey || Number(value)) ||
                    `${lastPressedKey}`.length === MAX_NUM_INPUT_DIGITS
                )
                    return;

                setCurrentValue((prev) =>
                    isLastOperator ? value : `${prev}${value}`
                );
                setPressedKeys((prev) => {
                    if (lastPressedKey === OPERATORS.EQUALS) return [value];
                    const prevKeys = isLastOperator ? prev : prev.slice(0, -1);
                    return [
                        ...prevKeys,
                        isLastOperator ? value : `${lastPressedKey}${value}`,
                    ];
                });
            }
        },
        [setPressedKeys, setCurrentValue, pressedKeys]
    );

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            event.preventDefault();

            const getKeyValue = (value: string): ValueType =>
                (OPERATOR_ADDON_MAP[value as CALC_ADDONS] ||
                    value) as ValueType;

            const keyValue = getKeyValue(event.key);
            const isNumericKey = !isNaN(Number(keyValue));

            if (
                isNumericKey ||
                isOperator(keyValue) ||
                isCalcAddons(keyValue)
            ) {
                handleKeyClick(keyValue);
            }
        };

        if (window) {
            window.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            if (window) window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyClick]);

    return {
        currentValue,
        pressedKeys,
        history,
        handleKeyClick,
    };
};

export default useCalculator;
