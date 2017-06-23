let path = require("path"),
    settings = require("../app/settings.dev.js"),
    HtmlWebPackPlugIn = require("html-webpack-plugin");

module.exports =
{
    entry: path.resolve(__dirname, "../src/tmp-full.js"),

    output:
    {
        path        : path.resolve(__dirname, "../built"),
        publicPath  : "/",
        filename    : "full.compiled.js"
    },

    plugins:
    [
        new HtmlWebPackPlugIn
        (
            {
                filename    : path.resolve(__dirname, "../output/index.html"),
                template    : "src/tmp-index.html",
                inject      : false,

                data        :
                {
                    title   : "The Practice for React-Redux",
                    bundle  : settings.bundle
                }
            }
        )
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
            }
        ]
    }
};