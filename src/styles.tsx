import styled from "styled-components";
import { COLORS } from "./constants";

export const StyledWrapper = styled.div`
    display: grid;
    grid-template-columns: 400px minmax(350px, 1fr) 400px;
    width: 100%;
    height: 100vh;
    gap: 16px;
    background-color: #1c1c29;
    color: #ffffff;

    @media (max-width: 1200px) {
        display: flex;
        flex-wrap: wrap;
        height: auto;
        gap: unset;
    }

    @media (max-width: 800px) {
        gap: 16px;
        flex-direction: column;
    }

    .scroll-container {
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

export const StyledCalculator = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    min-height: 500px;

    @media (max-width: 1300px) {
        flex: 1;
    }

    @media (max-width: 800px) {
        flex: 1 100%;
    }
`;

export const StyledContainer = styled.div`
    width: 300px;
    border-radius: 16px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: 0px 20px 80px rgba(103, 103, 146, 0.5);

    @media (max-width: 800px) {
        box-shadow: 0px 10px 30px rgba(103, 103, 146, 0.5);
    }
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

    .history-title {
        span {
            font-size: 12px;
            color: ${COLORS.primary?.[100]};
        }
    }

    .scroll-container {
        flex: 1;
    }

    footer {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px 0;
        align-self: center;
        border-top: 1px solid ${COLORS.primary?.[500]};

        a {
            color: ${COLORS.special?.[100]};
            text-decoration: none;

            &:hover {
                color: ${COLORS.success?.[100]};
                text-decoration: underline;
            }
        }
    }

    @media (max-width: 1200px) {
        flex: 1 100%;
        border-left: none;
        border-top: 1px solid ${COLORS.primary?.[500]};
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

export const StyledInfoPanel = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    border-right: 1px solid ${COLORS.primary?.[500]};
    overflow: hidden;

    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;

        img {
            width: 28px;
            height: 28px;
            cursor: pointer;
        }
    }

    main {
        display: flex;
        flex-direction: column;
        gap: 16px;

        .info-para {
            padding: 16px;
            background-color: ${COLORS.primary?.[700]};
            border-radius: 12px;
        }

        hr {
            width: 100%;
            height: 1px;
            background: ${COLORS.primary?.[500]};
            margin: 16px 0 8px 0;
        }

        .info-table {
            border-collapse: collapse;
            border-radius: 10px;

            td,
            th {
                font-size: 14px;
                padding: 8px;
                text-align: left;
                border: 1px solid ${COLORS.primary?.[500]};
            }

            thead {
                background-color: ${COLORS.primary?.[700]};
            }

            .info-symbol {
                text-align: center;
            }
        }
    }

    @media (max-width: 1200px) {
        flex: 0 0 400px;
    }

    @media (max-width: 800px) {
        flex: 1 100%;
        border-right: none;
        border-bottom: 1px solid ${COLORS.primary?.[500]};
    }
`;
