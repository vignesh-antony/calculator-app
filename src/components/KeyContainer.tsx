import React from "react";
import styled from "styled-components";

const StyledKeyContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, max-content);
    grid-gap: 8px;
`;

const KeyContainer: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return <StyledKeyContainer>{children}</StyledKeyContainer>;
};

export default KeyContainer;
