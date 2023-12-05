import React from "react";
import Button from "./Button";
import ResultContainer from "./ResultContainer";
import { DISPLAY_KEYS, ValueType } from "../constants";
import { StyledCalculator, StyledContainer, StyledKeysWrap } from "../styles";
import useCalculator from "../hooks/useCalculator";

const Calculator = () => {
    const { currentValue, pressedKeys, handleKeyClick } = useCalculator();

    const handleOnClick = (value: ValueType) => () => handleKeyClick(value);

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
