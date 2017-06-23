import React, { Component } from "react";
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
        console.log(formula.join(" "));
        this.calculator.update({ record: `[UPD] ${formula.join(",")}` });
    }

    render()
    {
        return (
            <Calculator ref={(instance) => { this.calculator = instance; }} recording={(formula) => this.write(formula)} />
        );
    }
}

class Record extends Component
{
    render()
    {
        return <div></div>;
    }
}

export default Histories;