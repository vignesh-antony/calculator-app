import React from "react";
import GitHubIcon from "../assets/github.svg";
import { StyledInfoPanel } from "../styles";

const InfoPanel = () => {
    const handleGitHubClick = () =>
        window.open(
            "https://github.com/vignesh-antony/calculator-app",
            "_blank"
        );

    const handleLogoClick = () => window.location.reload();

    return (
        <StyledInfoPanel>
            <header>
                <img
                    src="calculator.png"
                    alt="Calculato Logo"
                    onClick={handleLogoClick}
                />
                <h3>Basic Calculator</h3>
                <img
                    src={GitHubIcon}
                    alt="Github Icon"
                    onClick={handleGitHubClick}
                />
            </header>
            <main className="scroll-container">
                <p className="info-para">
                    Calculator application built in <b>React</b>. Enjoy
                    calculating with simplicity and ease!
                </p>
                <hr />
                <h4>Button details</h4>
                <table className="info-table">
                    <thead>
                        <tr>
                            <th className="info-symbol">Button</th>
                            <th>Name</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="info-symbol">^</td>
                            <td>Exponentiation</td>
                            <td>Raise a number to the power of another.</td>
                        </tr>
                        <tr>
                            <td className="info-symbol">±</td>
                            <td>Negation</td>
                            <td>Negate the sign of a number.</td>
                        </tr>
                        <tr>
                            <td className="info-symbol">C</td>
                            <td>Backspace</td>
                            <td>Edits the latest input.</td>
                        </tr>
                        <tr>
                            <td className="info-symbol">AC</td>
                            <td>All Clear</td>
                            <td>Resets the calculator.</td>
                        </tr>
                    </tbody>
                </table>
                <hr />
                <h4>Keyboard Mapping</h4>
                <p className="info-para">
                    You can utilize your keyboard for entering values, with the
                    Enter key triggering computations. To reset the calculator,
                    press the Escape key, and for editing the latest input, use
                    the Backspace key.
                </p>
            </main>
        </StyledInfoPanel>
    );
};

export default InfoPanel;
