//TODO: look at: https://github.com/ruanyf/css-modules-demos and try to improve css-modules
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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