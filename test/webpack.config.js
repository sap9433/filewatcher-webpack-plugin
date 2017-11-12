"use strict";
var path = require("path"),
    webpack = require("webpack"),
    watchFilePlugin = require("../index.js");
module.exports = {
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
        loaders: [{
            test: /\.ajs$/,
            loaders: ["node-async-require-loader?preParser=rt&async=false"]
        }, {
            test: /\.jsx$/,
            loaders: ["jsx-loader?insertPragma=React.DOM&harmony"]
        }]
    },
    plugins: [
        new watchFilePlugin({watchFolder: path.join(__dirname ,"/fixtures/components/"), watchExtension: "rt"})
    ],
    externals: {

    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.ajs', '.html'],
        alias: {"React/addons": path.join(__dirname,"../node_modules/react/addons.js")}
    }
};