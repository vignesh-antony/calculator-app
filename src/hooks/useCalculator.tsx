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
                const keysPressed = isLastOperator
                    ? pressedKeys.slice(0, -1)
                    : pressedKeys;

                if (keysPressed.length <= 1) return;

                const result = evaluateExpression(keysPressed) || 0;

                setCurrentValue(result);
                setPressedKeys([result, value]);

                saveToHistory(result, keysPressed);
            };

            const handleClear = () => {
                setCurrentValue(CALC_ADDONS.EMPTY);
                setPressedKeys([]);
            };

            const handleBackspace = () => {
                const prefixString = `${lastPressedKey}`.slice(0, -1);

                setCurrentValue(
                    (isLastOperator ? pressedKeys.at(-2) : prefixString) ||
                        pressedKeys.at(-3) ||
                        CALC_ADDONS.EMPTY
                );
                setPressedKeys((prev) => {
                    const remainingKeys = prev.slice(0, -1);
                    return isLastOperator || !prefixString
                        ? remainingKeys
                        : [...remainingKeys, prefixString];
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
                const decimalValue = `${lastPressedKey}${value}` as ValueType;

                setCurrentValue(decimalValue);
                setPressedKeys((prev) => {
                    const prevKeys = prev.slice(0, -1);
                    return [...prevKeys, decimalValue];
                });
            };

            if (isOperator(value) || isCalcAddons(value)) {
                if (!lastPressedKey) return;
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
                console.log({ lastPressedKey, value });
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
