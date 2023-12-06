import styled from "styled-components";
import { COLORS } from "./constants";

export const StyledWrapper = styled.div`
    display: grid;
    grid-template-columns: 400px 1fr 400px;
    width: 100%;
    height: 100vh;
    gap: 16px;
    background-color: #1c1c29;
    color: #ffffff;
`;

export const StyledCalculator = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 16px;
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

export const StyledResultContainer = styled.div`
    padding: 12px;
    border-radius: 8px;
    background-color: #474786;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: flex-end;
    overflow: hidden;

    .expression {
        white-space: nowrap;
    }
`;

export const StyledHistoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-left: 1px solid ${COLORS.primary?.[500]};
    overflow: hidden;

    .history-title,
    .no-history {
        width: 100%;
        padding: 16px;
        border-bottom: 1px solid ${COLORS.primary?.[500]};
    }

    .history-scroll-container {
        overflow-y: auto;

        &::-webkit-scrollbar {
            width: 8px;
        }
        &::-webkit-scrollbar-track {
            background: ${COLORS.primary?.[900]};
        }
        &::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 24px;
        }
        &::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
    }
`;

export const StyledHistoryWrap = styled.div`
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
    cursor: pointer;

    span {
        color: ${COLORS.primary?.[100]};
        font-size: 14px;
    }

    &:hover {
        background-color: ${COLORS.primary?.[700]};
    }
`;
