import React, { useMemo } from "react";
import { StyledResultContainer } from "../styles";

interface ResultContainerProps {
    currentValue?: string | number;
    pressedKeys?: (string | number)[];
}

const ResultContainer: React.FC<ResultContainerProps> = ({
    pressedKeys = [],
    currentValue,
}) => {
    const expression = useMemo(
        () => pressedKeys.join(" ") || "0",
        [pressedKeys]
    );
    return (
        <StyledResultContainer>
            <div>{expression}</div>
            <h1>{currentValue || 0}</h1>
        </StyledResultContainer>
    );
};

export default ResultContainer;
