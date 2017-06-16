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

    devtool: process.env.VARS ? JSON.parse(process.env.VARS)["SMAP"] || false : false,

    output:
    {
        path                : path.join(__dirname, "output/bundles"),
        publicPath          : "/bundles",
        filename            : "app.js",
        sourceMapFilename   : "[file].map"
    },

    plugins:
    [
        new webpack.HotModuleReplacementPlugin(),

        new webpack.DefinePlugin
        (
            {
                "process.env":
                {
                    "NODE_ENV": JSON.stringify("development")
                }
            }
        )
    ],

    module:
    {
        rules:
        [
            {
                test: /\.js$/,
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