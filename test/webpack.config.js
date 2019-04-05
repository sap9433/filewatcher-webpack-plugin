"use strict";
var path = require("path"),
    webpack = require("webpack"),
    watchFilePlugin = require("../index.js");
module.exports = {
    mode: 'development',
    cache: true,
    entry: {
        index: path.join(__dirname,"./fixtures/index.jsx")
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "/",
        filename: 'js/[name].js'
    },
    module: {
        rules:[
            {
            test: /\.ajs$/,
            loader: ["node-async-require-loader?preParser=rt&async=false"]
            },
            {
                test: /\.jsx$/,
                loader: ["jsx-loader?insertPragma=React.DOM&harmony"]
            }
        ]
    },
    plugins: [
        new watchFilePlugin({watchFolder: path.join(__dirname ,"/fixtures/components/"), watchExtension: "rt"})
    ],
    externals: {

    },
    resolve: {
        extensions: ['.js', '.jsx', '.ajs', '.html'],
        alias: {"React": path.join(__dirname,"../node_modules/react/index.js")}
    }
};