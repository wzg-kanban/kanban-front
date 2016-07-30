const webpack = require('webpack');

exports.generateServerConfig = function(options) {
    if(!options) {
        options = {};
    }
    return {
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            stats: 'errors-only',
            host: options.host || 'localhost',
            port: options.port || 8080
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin({
                multiStep: true
            })
        ]
    };
};