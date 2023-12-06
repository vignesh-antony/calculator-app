import React, { useMemo } from "react";
import { StyledResultContainer } from "../styles";
import { HistoryType, ValueType } from "../constants";
import { getPressedKeyType } from "../utils";

interface ResultContainerProps {
    currentValue?: string | number;
    pressedKeys?: ValueType[];
    history?: HistoryType[];
}

const ResultContainer: React.FC<ResultContainerProps> = ({
    pressedKeys = [],
    currentValue,
    history = [],
}) => {
    const result = currentValue || 0;

    const lastPressedKey = pressedKeys.at(-1) as ValueType;
    const { isEqualsKey = false } = getPressedKeyType(lastPressedKey);

    const { evaluatedExpr = [] } = history.at(0) || {};

    const expression = useMemo(() => {
        const keys = isEqualsKey
            ? [...evaluatedExpr, lastPressedKey]
            : pressedKeys;
        return keys.join(" ") || "0";
    }, [pressedKeys, evaluatedExpr, isEqualsKey, lastPressedKey]);

    return (
        <StyledResultContainer>
            <div className="expression" title={expression}>
                {expression}
            </div>
            <h1 title={`${result}`}>{result}</h1>
        </StyledResultContainer>
    );
};

export default ResultContainer;
