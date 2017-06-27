import path from "path";
import webpack from "webpack";

import settings from "../app/settings.dev";

module.exports =
{
    entry:
    {
        "app":
        [
            "react-hot-loader/patch",
            path.resolve(__dirname, "../js/app-index"),
            `webpack-dev-server/client?http://${settings.host}:${settings.port}`,
            "webpack/hot/only-dev-server"
        ]
    },

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
            },

            {
                test: /\.ico$/,
                loader: "url-loader",
                query:
                {
                    mimetype: "image/x-icon"
                }
            }
        ]
    }
};