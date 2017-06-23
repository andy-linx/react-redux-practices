import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";

import "../css/app-index";

let root_element, entrance_rnr;

// Static Component
(
    (immediate) => immediate
    (
        root_element =
        document.getElementById("app-contr")
    )
)
(
    entrance_rnr = (container) =>
    {
        let Entrance = require("./entrance");

        render
        (
            <AppContainer>
                <Entrance />
            </AppContainer>,

            root_element
        );
    }
);

module.hot && module.hot.accept
(
    "./entrance.js",
    () => entrance_rnr(root_element)
);