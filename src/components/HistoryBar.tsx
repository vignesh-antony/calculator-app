import React, { FC } from "react";
import { StyledHistoryContainer, StyledHistoryWrap } from "../styles";
import { HistoryType } from "../constants";

interface HistoryBarProps {
    history: HistoryType[];
}

const HistoryBar: FC<HistoryBarProps> = ({ history = [] }) => {
    return (
        <StyledHistoryContainer>
            <h3 className="history-title">Calculation History</h3>
            <div className="history-scroll-container">
                {history.length ? (
                    history.map(({ evaluatedExpr, result }) => {
                        const expression = evaluatedExpr.join(" ");
                        return (
                            <StyledHistoryWrap>
                                <span>{expression} = </span>
                                <h2>{result}</h2>
                            </StyledHistoryWrap>
                        );
                    })
                ) : (
                    <div className="no-history">No history available.</div>
                )}
            </div>
        </StyledHistoryContainer>
    );
};

export default HistoryBar;
