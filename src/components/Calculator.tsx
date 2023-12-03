import React, { useState } from "react";
import Button from "./Button";
import ResultContainer from "./ResultContainer";
import { CALC_ADDONS, DISPLAY_KEYS, OPERATORS, ValueType } from "../constants";
import { StyledCalculator, StyledContainer, StyledKeysWrap } from "../styles";
import { evaluateExpression, isOperator } from "../utils";

const Calculator = () => {
    const [currentValue, setCurrentValue] = useState<string | number>(0);
    const [pressedKeys, setPressedKeys] = useState<ValueType[]>([]);

    const handleOnClick = (value: ValueType) => () => {
        const lastPressedKey = pressedKeys.at(-1) || CALC_ADDONS.EMPTY;
        const isLastOperator = isOperator(lastPressedKey);

        if (isOperator(value)) {
            if (value === OPERATORS.EQUALS) {
                const result = evaluateExpression(pressedKeys) || 0;
                setCurrentValue(result);
                setPressedKeys([result]);
            } else {
                setPressedKeys((prev) => {
                    const prevKeys = isLastOperator ? prev.slice(0, -1) : prev;
                    return [...prevKeys, value];
                });
            }
        } else {
            // TODO: Check cases for previously evaluated result and newly entered number
            setCurrentValue((prev) =>
                isLastOperator ? Number(value) : Number(`${prev}${value}`)
            );
            setPressedKeys((prev) => {
                const prevKeys = isLastOperator ? prev : prev.slice(0, -1);
                return [
                    ...prevKeys,
                    isLastOperator
                        ? value
                        : Number(`${lastPressedKey}${value}`),
                ];
            });
        }
    };

    return (
        <StyledCalculator>
            <h3>Basic Calculator</h3>
            <StyledContainer>
                <ResultContainer
                    pressedKeys={pressedKeys}
                    currentValue={currentValue}
                />
                <StyledKeysWrap>
                    {DISPLAY_KEYS.map(
                        (
                            {
                                label,
                                value,
                                buttonVariant = "solid",
                                buttonColor = "primary",
                            },
                            idx
                        ) => (
                            <Button
                                label={label}
                                key={idx}
                                variant={buttonVariant}
                                color={buttonColor}
                                onClick={handleOnClick(value)}
                            />
                        )
                    )}
                </StyledKeysWrap>
            </StyledContainer>
        </StyledCalculator>
    );
};

export default Calculator;
