const merge = require("webpack-merge");
const webpackConfig = require("./webpack.config");
const webpack = require("webpack");

module.exports = merge(webpackConfig, {
    devtool: "eval",

    output: {
        pathinfo: true,
        publicPath: "/",
        filename: "[name].js"
    },

    devServer: {
        host: "0.0.0.0"
    },
    plugins: [new webpack.IgnorePlugin(/vertx/)]
});
