import React from "react";
import styled from "styled-components";

const StyledResultContainer = styled.div`
    padding: 12px;
    border-radius: 8px;
    background-color: #474786;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-end;
`;

const ResultContainer = () => {
    return (
        <StyledResultContainer>
            <div>15 * 2</div>
            <h1>30</h1>
        </StyledResultContainer>
    );
};

export default ResultContainer;
