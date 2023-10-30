import React from "react";
import styled from "styled-components";
import Button from "./Button";
import Container from "./Container";

const StyledCalcutator = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    gap: 16px;
`;

const Calculator = () => {
    const numbers = Array.from(Array(10))
        .map((_, idx) => `${idx}`)
        .reverse();

    return (
        <StyledCalcutator>
            <h3>Basic Calculator</h3>
            <Container>
                {numbers.map((value, idx) => (
                    <Button label={value} key={idx} variant="outlined" />
                ))}
            </Container>
        </StyledCalcutator>
    );
};

export default Calculator;
