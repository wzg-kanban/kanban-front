const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.generateCommonConfig = function(PATHS) {
    return {
        entry: {
            app: PATHS.app
        },
        output: {
            path: PATHS.build,
            filename: '[name].js'
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    loaders: ['babel?cacheDirectory'],
                    include: PATHS.app
                }
            ]
        },
        resolve: {
            extensions: ['', '.js', '.jsx'],
            root: [PATHS.app, PATHS.nodeModules]
        }
    };
};

exports.generateIndexTemplate = function(options) {
    return {
        //TODO: get to know what is inject: false ???
        plugins: [
            new HtmlWebpackPlugin({
                template: require('html-webpack-template'),
                title: options.title,
                appMountId: options.appMountId,
                inject: false
            })
        ]
    };
};

//TODO: maybe try to split bundles like this: http://survivejs.com/webpack/building-with-webpack/splitting-bundles/
exports.extractBundle = function(options) {
    const entry = {};
    entry[options.name] = options.entries;

    return {
        entry: entry,
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                names: [options.name, 'manifest']
            })
        ]
    };
};