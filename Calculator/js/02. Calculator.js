import React, { Component } from "react";
import PropTypes from "prop-types";

import "../css/02. Calculator.css";

class Calculator extends Component
{
    constructor(props)
    {
        super(props);

        this.state =
        {
            formula: [0],
            result: 0
        };
    }

    static scale = (scalable) =>
    (
        /x(C2|R2)/g.test(scalable) ? scalable : ""
    );

    update = (input) =>
    {
        let { formula, result = 0 } = this.state;

        // To make a new instance from reference type object.
        formula = formula.slice();

        const evaluation = () =>
        {
            try { result = eval(formula.join("")) || 0; }
            catch (ex) { result = 0; }
            finally { formula = [result]; }
        };

        if (isNaN(+input))
        {
            switch (input)
            {
                case "C":
                    formula = [0], result = 0;
                    break;

                case "+":
                case "-":
                    evaluation();
                    formula.push(...[input, 0]) - 1;
                    break;

                case "=":
                    evaluation();
                    break;
            }
        }
        else
        {
            let last = formula.length - 1, current = formula[last];

            formula[last] = +(current += input);
            result = current ? formula[last] : result;
        }

        // { formula : formula } ==> { formula }
        //
        // No need to have key to assignment, if the key is same as variable name.
        // It seems like "Destructuring Assignment" syntax.
        this.setState({ formula, result: +result });
    }

    render()
    {
        return (
            <table className="calculator">
                <tbody>
                    <tr>
                        <td colSpan="3">
                            <input type="text" className="calculator" readOnly="true" disabled value={this.state.result} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            { GenerateButtonNumericList([1, 2, 3], this.update) }
                        </td>
                        <td>
                            <div className="calculator-button-list">
                                <ButtonOperator text="-" update={this.update} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            { GenerateButtonNumericList([4, 5, 6], this.update) }
                        </td>
                        <td rowSpan="2">
                            <div className="calculator-button-list">
                                <ButtonOperator text="+" scalable="xR2" update={this.update} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            { GenerateButtonNumericList([7, 8, 9], this.update) }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="calculator-button-list">
                                <ButtonNumeric text="0" scalable="xC2" update={this.update} />
                            </div>
                        </td>
                        <td>
                            <div className="calculator-button-list">
                                <ButtonOperator text="C" update={this.update} />
                            </div>
                        </td>
                        <td>
                            <div className="calculator-button-list">
                                <ButtonOperator text="=" update={this.update} />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

module.exports = Calculator;

// Sub-Components
class ButtonNumeric extends Component
{
    constructor(props)
    {
        super(props);
        this.tab_index = +this.props.text;
    }

    hnr_click = (e) =>
    {
        const dom = e.target || e.which;

        dom.blur();
        this.props.update(dom.innerText);
    }

    render()
    {
        let { text, scalable = Calculator.scale(scalable) } = this.props;

        return (
            <div tabIndex={this.tab_index} className={"calculator-button".concat(" ", scalable)} onClick={this.hnr_click}>
                {text}
            </div>
        );
    }
}

class ButtonOperator extends ButtonNumeric
{
    constructor(props)
    {
        super(props);
        this.tab_index = 99;
    }

    render()
    {
        let { text } = this.props;

        switch (text)
        {
            case "-"    : this.tab_index = 90;   break;
            case "+"    : this.tab_index = 91;   break;
            case "="    : this.tab_index = 92;   break;
            case "C"    : this.tab_index = 93;   break;
            default     : this.tab_index = 99;   break;
        }

        return super.render();
    }
}

// Static Functions
const GenerateButtonNumericList = (buttons, fn_update) =>
{
    let components = [];

    components.push
    (
        ...buttons.map
        (
            (element, index) =>
            {
                return <ButtonNumeric key={index} text={element} update={fn_update} />;
            }
        )
    );

    return <div className="calculator-button-list">{components}</div>;
};

GenerateButtonNumericList.PropTypes =
{
    buttons: PropTypes.arrayOf(PropTypes.number).isRequired,
    fn_update: PropTypes.func.isRequired
};