import styled from "styled-components";

export const StyledCalcutator = styled.div`
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

export const StyledContainer = styled.div`
    width: 300px;
    border-radius: 16px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: 0px 20px 80px rgba(103, 103, 146, 0.5);
`;

export const StyledKeysWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 12px;
`;
