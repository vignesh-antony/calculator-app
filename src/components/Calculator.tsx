import React from "react";
import styled from "styled-components";
import Button from "./Button";
import KeyContainer from "./KeyContainer";
import ResultContainer from "./ResultContainer";
import { DISPLAY_KEYS } from "../constants";

const StyledCalcutator = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    gap: 16px;
    background-color: #1c1c29;
    color: #ffffff;
`;

const StyledContainer = styled.div`
    width: 300px;
    height: 500px;
    border: 1px solid #676792;
    border-radius: 16px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const Calculator = () => {
    return (
        <StyledCalcutator>
            <h3>Basic Calculator</h3>
            <StyledContainer>
                <ResultContainer />
                <KeyContainer>
                    {DISPLAY_KEYS.map((displayRow) => {
                        return displayRow.map((displayKey, idx) => (
                            <Button
                                label={displayKey}
                                key={idx}
                                variant="filled"
                            />
                        ));
                    })}
                </KeyContainer>
            </StyledContainer>
        </StyledCalcutator>
    );
};

export default Calculator;
