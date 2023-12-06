import React, { FC } from "react";
import { StyledHistoryContainer, StyledHistoryWrap } from "../styles";
import { HistoryType } from "../types";

interface HistoryBarProps {
    history: HistoryType[];
}

const HistoryBar: FC<HistoryBarProps> = ({ history = [] }) => {
    return (
        <StyledHistoryContainer>
            <div className="history-title">
                <h3>Calculation History</h3>
                <span>View the record of previous calculations.</span>
            </div>
            <div className="scroll-container">
                {history.length ? (
                    history.map(({ createdAt, evaluatedExpr, result }) => {
                        const expression = evaluatedExpr.join(" ");
                        return (
                            <StyledHistoryWrap key={createdAt}>
                                <span>{expression} = </span>
                                <h2>{result}</h2>
                            </StyledHistoryWrap>
                        );
                    })
                ) : (
                    <div className="no-history">No history available.</div>
                )}
            </div>
            <footer>
                <div>
                    Designed and developed by{" "}
                    <a
                        href="https://github.com/vignesh-antony"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Vignesh Antonyraj
                    </a>
                </div>
            </footer>
        </StyledHistoryContainer>
    );
};

export default HistoryBar;
