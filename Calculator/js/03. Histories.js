import React, { Component } from "react";
import Calculator from "./02. Calculator";

class Histories extends Component
{
    constructor(props)
    {
        super();
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

export default Histories;