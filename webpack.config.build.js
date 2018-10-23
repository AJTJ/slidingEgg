const path = require("path");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpackConfig = require("./webpack.config");
const webpack = require("webpack");

module.exports = merge(webpackConfig, {
    devtool: "source-map",

    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].[chunkhash].js",
        publicPath: "./"
    },

    plugins: [
        new CleanWebpackPlugin(["dist"]),
        new webpack.IgnorePlugin(/vertx/)
    ]
});
