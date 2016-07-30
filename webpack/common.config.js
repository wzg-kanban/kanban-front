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
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Kanban App'
            })
        ],
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
            extensions: ['', '.js', '.jsx']
        }
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