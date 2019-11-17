'use strict';

const package_json = require( './package' );

module.exports = {
    mode: 'production',
    entry: {
        '@futoin/log': `./${package_json.browser}`,
    },
    output: {
        library: {
            root: "FutoInLog",
            amd: "@futoin/log",
            commonjs: "@futoin/log",
        },
        libraryTarget: "umd",
        filename: "[name].js",
        path: __dirname + '/dist',
    },
    externals : {
        'futoin-asyncsteps' : {
            root: "$as",
            amd: "futoin-asyncsteps",
            commonjs: "futoin-asyncsteps",
            commonjs2: "futoin-asyncsteps",
        },
        'futoin-asyncevent' : {
            root: "$asyncevent",
            amd: "futoin-asyncevent",
            commonjs: "futoin-asyncevent",
            commonjs2: "futoin-asyncevent",
        },
        'futoin-invoker' : {
            root: "FutoInInvoker",
            amd: "futoin-invoker",
            commonjs: "futoin-invoker",
            commonjs2: "futoin-invoker",
        },
        'futoin-executor' : {
            root: "FutoInExecutor",
            amd: "futoin-executor",
            commonjs: "futoin-executor",
            commonjs2: "futoin-executor",
        },
    },
    node : false,
};
