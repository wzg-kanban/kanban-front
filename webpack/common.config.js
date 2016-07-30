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
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel',
                    query: {
                        presets: ['es2015']
                    }
                }
            ]
        }
    };
};