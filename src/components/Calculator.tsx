import React from "react";
import Button from "./Button";
import ResultContainer from "./ResultContainer";
import { DISPLAY_KEYS } from "../constants";
import { StyledCalcutator, StyledContainer, StyledKeysWrap } from "../styles";

const Calculator = () => {
    const handleOnClick = (value: string | number) => () => {
        console.log(value);
    };

    return (
        <StyledCalcutator>
            <h3>Basic Calculator</h3>
            <StyledContainer>
                <ResultContainer />
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
