import path from "path";
import webpack from "webpack";
import WebPackDevServer from "webpack-dev-server";

import config from "./webpack.config";
import settings from "./app/settings.dev";

const server = new WebPackDevServer
(
    webpack(config),

    {
        contentBase : path.join(__dirname, "output"),
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