import path from "path";
import webpack from "webpack";

import settings from "./app/settings.dev";

module.exports =
{
    entry:
    [
        // Pay attention on "react-hot-loader" must be the first one always.
        "react-hot-loader/patch",

        // This path would indicate to the virtaul path, "~/js/index.js", not default view page.
        path.join(__dirname, "js/index"),

        `webpack-dev-server/client?http://${settings.host}:${settings.port}`,
        "webpack/hot/only-dev-server"
    ],

    output:
    {
        path        : path.join(__dirname, "output/bundles"),
        publicPath  : "/bundles",
        filename    : "app.js"
    },

    plugins:
    [
        new webpack.HotModuleReplacementPlugin()
    ],

    module:
    {
        rules:
        [
            {
                // { and: [Condition] }     : All Conditions must match.
                // { or: [Condition] }      : Any Condition must match.
                // { not: [Condition] }     : All Conditions must NOT match.

                // { include: Condition }   : The Condition must match.
                // The convention is to provide a string or array of strings here, but it"s not enforced.

                // { test: Condition } The Condition must match.
                // The convention is to provide a RegExp or array of RegExps here, but it"s not enforced.
                test: /\.js$/,

                // { exclude: Condition }   : The Condition must NOT match.
                // The convention is to provide a string or array of strings here, but it"s not enforced.
                exclude: [/node_modules/],

                loader: ["babel-loader"]
            },

            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    }
};