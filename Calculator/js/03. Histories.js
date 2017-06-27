import React, { Component } from "react";
import PropTypes from "prop-types";

import Calculator from "./02. Calculator";

import "../css/03. Histories";

class Histories extends Component
{
    constructor(props)
    {
        super();

        this.state =
        {
            histories: []
        };

        this.calculator = null;
    }

    write = (formula) =>
    {
        formula === "C" && (formula = []);

        if (formula instanceof Array)
        {
            let { histories } = this.state;
            histories = histories.slice();
            formula.length ? histories.push(formula) : (histories = formula);
            this.setState({ histories });
        }
    }

    remove = (index) =>
    {
        if (this.state.histories.length)
        {
            let { histories } = this.state, formula;

            histories = histories.slice();
            formula = histories.splice(index, 1);

            formula.length &&
            (
                this.calculator.update({ value: eval(formula[0].join("")) }),
                this.setState({ histories })
            );
        }
    }

    render()
    {
        return (
            <div className="main-container">
                <Calculator ref={(instance) => { this.calculator = instance; }} recording={(formula) => this.write(formula)} />
                <ul>
                    {
                        this.state.histories.map
                        (
                            (formula, index) =>
                            {
                                const expression = formula.join(" ");
                                return <li key={index} onClick={() => this.remove(index)}>{`${expression} = ${eval(expression)}`}</li>;
                            }
                        )
                    }
                </ul>
            </div>
        );
    }
}

export default Histories;