const path = require('path');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const commonConfig = require('./webpack/common.config');
const stylesConfig = require('./webpack/styles.config');
const serverConfig = require('./webpack/server.config');
const codeConfig = require('./webpack/code.config');
const variableConfig = require('./webpack/variables.config');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

var config, TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

switch (TARGET) {
    case 'build':
    case 'stats':
        console.log('Build config selected!\n');
        config = merge(
            commonConfig.generateCommonConfig(PATHS),
            {
                output: {
                    path: PATHS.build,
                    filename: '[name].[chunkhash:5].js',
                    chunkFilename: '[chunkhash:5].js'
                }
            },
            variableConfig.generateFreeVariable(
                'process.env.NODE_ENV',
                'production'
            ),
            commonConfig.extractBundle({
                name: 'vendor',
                entries: ['react']
            }),
            codeConfig.generateMinifyConfig(),
            stylesConfig.extractCSS(PATHS.app),
            stylesConfig.purifyCSS([PATHS.app]),
            codeConfig.clean(PATHS.build)
        );
        break;
    default:
        console.log('Default config selected!\n');
        config = merge(
            commonConfig.generateCommonConfig(PATHS),
            stylesConfig.generateStylesConfig(PATHS.app),
            serverConfig.generateServerConfig()
        );
}

module.exports = validate(config);