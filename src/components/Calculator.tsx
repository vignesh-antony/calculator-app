import React from "react";
import Button from "./Button";
import ResultContainer from "./ResultContainer";
import { DISPLAY_KEYS, ValueType } from "../constants";
import {
    StyledCalculator,
    StyledWrapper,
    StyledContainer,
    StyledKeysWrap,
} from "../styles";
import useCalculator from "../hooks/useCalculator";
import HistoryBar from "./HistoryBar";
import InfoPanel from "./InfoPanel";

const Calculator = () => {
    const { currentValue, pressedKeys, history, handleKeyClick } =
        useCalculator();

    const handleOnClick = (value: ValueType) => () => handleKeyClick(value);

    return (
        <StyledWrapper>
            <InfoPanel />
            <StyledCalculator className="scroll-container">
                <StyledContainer>
                    <ResultContainer
                        pressedKeys={pressedKeys}
                        currentValue={currentValue}
                        history={history}
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
            <HistoryBar history={history} />
        </StyledWrapper>
    );
};

export default Calculator;
