import { useState, useEffect, useCallback } from "react";
import {
    CALC_ADDONS,
    OPERATORS,
    OPERATOR_ADDON_MAP,
    ValueType,
} from "../constants";
import { evaluateExpression, isCalcAddons, isOperator } from "../utils";

const useCalculator = () => {
    const [currentValue, setCurrentValue] = useState<string | number>(0);
    const [pressedKeys, setPressedKeys] = useState<ValueType[]>([]);

    const handleKeyClick = useCallback(
        (value: ValueType) => {
            const lastPressedKey = pressedKeys.at(-1) ?? CALC_ADDONS.EMPTY;
            const isLastOperator = isOperator(lastPressedKey);

            const handleEquals = () => {
                const keysPressed = isLastOperator
                    ? pressedKeys.slice(0, -1)
                    : pressedKeys;
                const result = evaluateExpression(keysPressed) || 0;

                setCurrentValue(result);
                setPressedKeys([result, value]);
            };

            const handleClear = () => {
                setCurrentValue(0);
                setPressedKeys([]);
            };

            const handleBackspace = () => {
                const prefixNumber = Number(`${lastPressedKey}`.slice(0, -1));
                setCurrentValue(
                    (isLastOperator ? pressedKeys.at(-2) : prefixNumber) ||
                        pressedKeys.at(-3) ||
                        0
                );
                setPressedKeys((prev) => {
                    const remainingKeys = prev.slice(0, -1);
                    return isLastOperator || !prefixNumber
                        ? remainingKeys
                        : [...remainingKeys, prefixNumber];
                });
            };

            if (isOperator(value) || isCalcAddons(value)) {
                switch (value) {
                    case OPERATORS.EQUALS: {
                        if (!lastPressedKey) break;
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
                    default: {
                        setPressedKeys((prev) => {
                            const prevKeys = isLastOperator
                                ? prev.slice(0, -1)
                                : prev;
                            return [...prevKeys, value];
                        });
                    }
                }
            } else {
                setCurrentValue((prev) =>
                    isLastOperator ? Number(value) : Number(`${prev}${value}`)
                );
                setPressedKeys((prev) => {
                    if (lastPressedKey === OPERATORS.EQUALS) return [value];
                    const prevKeys = isLastOperator ? prev : prev.slice(0, -1);
                    return [
                        ...prevKeys,
                        isLastOperator
                            ? value
                            : Number(`${lastPressedKey}${value}`),
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
        handleKeyClick,
    };
};

export default useCalculator;