const webpack = require('webpack');
const path = require ('path');

var DIS_DIR = path.resolve(__dirname, "dist");
var SRC_DIR =path.resolve(__dirname, "src");

var config = {
    entry: SRC_DIR + "/app/app.js",
    output: {
        path: DIS_DIR+"/app",
        filename: "bundle.js",
    },
    module:{
        loaders:[{
            test: /\.js?/,
            exclude: /(node_modules|bower_components)/,
            include: SRC_DIR,
            loader: "babel-loader",
            query:{
                presets:["react","es2015","stage-1","stage-2"],
                plugins: [

                    "transform-class-properties",
                    "transform-object-rest-spread"
                ]
            }
        }]
    }
};
module.exports =config;