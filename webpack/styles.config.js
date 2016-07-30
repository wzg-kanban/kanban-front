//TODO: look at: https://github.com/ruanyf/css-modules-demos and try to improve css-modules
//TODO: there is problem with CSS hash reloading when changing js and vice versa
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack-plugin');

exports.generateStylesConfig = function(PATHS) {
    return {
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loader: 'style!css?modules&localIdentName=[name]--[local]--[hash:base64:5]',
                    include: PATHS,
                }
            ]
        }
    };
};

exports.extractCSS = function(paths) {
    return {
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract(
                        'style',
                        'css?modules&localIdentName=[name]--[local]--[hash:base64:5]'),
                    include: paths
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('[name].[chunkhash:5].css')
        ]
    };
};

exports.purifyCSS = function(paths) {
    return {
        plugins: [
            new PurifyCSSPlugin({
                basePath: process.cwd(),
                paths: paths
            }),
        ]
    }
};
