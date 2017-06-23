import path from "path";
import webpack from "webpack";
import WebPackDevServer from "webpack-dev-server";

import config from "../.config/webpack.dev";
import settings from "./settings.dev";

const server = new WebPackDevServer
(
    webpack(config),

    {
        contentBase : path.resolve(__dirname, "../output"),
        publicPath  : config.output.publicPath,
        hot         : true,
        stats       : { chunks: false, colors: true }
    }
);

server.listen
(
    settings.port, settings.host, (error) =>
    {
        console.log
        (
            error ?
            `Server initiate is failed : ${error}` :
            `Server is running on ${settings.host}:${settings.port}`
        );
    }
);