import React, { useState } from "react";
import Button from "./Button";
import ResultContainer from "./ResultContainer";
import { DISPLAY_KEYS } from "../constants";
import { StyledCalcutator, StyledContainer, StyledKeysWrap } from "../styles";
import { isOperator } from "../utils";

const Calculator = () => {
    const [currentValue, setCurrentValue] = useState<string | number>(0);
    const [pressedKeys, setPressedKeys] = useState<(string | number)[]>([]);

    const handleOnClick = (value: string | number) => () => {
        const lastPressedKey = pressedKeys.at(-1) || "";
        const isLastOperator = isOperator(lastPressedKey);

        if (isOperator(value)) {
            setPressedKeys((prev) => {
                const prevKeys = isLastOperator ? prev.slice(0, -1) : prev;
                return [...prevKeys, value];
            });
        } else {
            setCurrentValue((prev) => Number(`${prev}${value}`));
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
        <StyledCalcutator>
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
        </StyledCalcutator>
    );
};

export default Calculator;
