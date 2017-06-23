import path from "path";
import webpack from "webpack";

import settings from "../app/settings.dev";

module.exports =
{
    entry:
    {
        "app":
        [
            // Pay attention on "react-hot-loader" must be the first one always.
            "react-hot-loader/patch",

            // This path would indicate to the virtaul path, "~/js/app-index.js", not default view page.
            path.resolve(__dirname, "../js/app-index"),

            `webpack-dev-server/client?http://${settings.host}:${settings.port}`,
            "webpack/hot/only-dev-server"
        ]
    },

    // There're 7 modes to configure.
    //
    // (1) eval
    // (2) cheap-eval-source-map
    // (3) cheap-source-map
    // (4) cheap-module-eval-source-map
    // (5) cheap-module-source-map
    // (6) eval-source-map
    // (7) source-map
    //
    // [Implementation 1st]
    // devtool: process.env["npm_package_config_source-map"] || false,
    //
    // [Implementation 2nd]
    devtool: process.env.VARS ? JSON.parse(process.env.VARS)["SMAP"] || false : false,

    output:
    {
        path                : path.resolve(__dirname, `../output/${settings.bundle}`),
        publicPath          : `/${settings.bundle}`,
        filename            : "[name].js",
        sourceMapFilename   : "[file].map"
    },

    plugins:
    [
        new webpack.HotModuleReplacementPlugin()
    ],

    resolve:
    {
        extensions: [".js", ".css"]
    },

    module:
    {
        rules:
        [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                loaders: ["babel-loader"]
            },

            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    }
};