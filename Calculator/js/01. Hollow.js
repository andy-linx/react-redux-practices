import React, { Component } from "react";

class Hollow extends Component
{
    render()
    {
        return  (
            <div style={{ fontFamily: "Arial", marginTop: "20px" }}>
                <span style={{ color: "#F00" }}>Hollow World</span>{"\u00A0"}&{"\u00A0"}
                <span style={{ color: "#00F", fontWeight: "bolder" }}>Greeting, Everyone !!!</span>
            </div>
        );
    }
}

module.exports = Hollow;