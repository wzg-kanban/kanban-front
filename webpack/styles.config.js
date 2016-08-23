//TODO: look at: https://github.com/ruanyf/css-modules-demos and try to improve css-modules
//TODO: there is problem with CSS hash reloading when changing js and vice versa
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack-plugin');
const cssLoaderQuery = 'css?modules&localIdentName=[name]--[local]--[hash:base64:5]';

exports.generateStylesConfig = function(PATHS) {
    return {
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loader: `style!${cssLoaderQuery}`,
                    include: PATHS,
                }
            ]
        }
    };
};

exports.extractCSS = function(PATHS) {
    return {
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract(
                        'style',
                        cssLoaderQuery),
                    include: PATHS
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin('[name].[chunkhash:5].css')
        ]
    };
};

exports.purifyCSS = function(PATHS) {
    return {
        plugins: [
            new PurifyCSSPlugin({
                basePath: process.cwd(),
                paths: PATHS
            }),
        ]
    }
};
