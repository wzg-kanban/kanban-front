const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

exports.generateMinifyConfig = function() {
    return {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    };
};

exports.clean = function(path) {
    return {
        plugins: [
            new CleanWebpackPlugin([path], {
                root: process.cwd()
            })
        ]
    };
};
