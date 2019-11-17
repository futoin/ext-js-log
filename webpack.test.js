'use strict';

module.exports = {
    mode: 'development',
    entry: {
        unittest : './es5/test/unittest.js',
    },
    output: {
        filename: "[name].js",
        path: __dirname + '/dist',
        libraryTarget: "umd",
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
    node : {
        stream: true,
        console: true,
    },
};
