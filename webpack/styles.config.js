//TODO: look at: https://github.com/ruanyf/css-modules-demos and try to improve css-modules
exports.generateStylesConfig = function(PATHS) {
    return {
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loader: 'style!css-loader?modules&localIdentName=[name]--[local]--[hash:base64:5]',
                    include: PATHS,
                }
            ]
        }
    };
};