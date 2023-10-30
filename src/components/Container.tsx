import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
    width: 300px;
    height: 500px;
    border: 1px solid #cccccc;
    border-radius: 16px;
    padding: 16px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, max-content);
    grid-gap: 8px;
`;

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
