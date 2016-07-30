const path = require('path');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const commonConfig = require('./webpack/common.config');
const stylesConfig = require('./webpack/styles.config');
const serverConfig = require('./webpack/server.config');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

var config;

switch (process.env.npm_lifecycle_event) {
    case 'build':
        console.log('Build config selected!\n');
        config = merge(
            commonConfig.generateCommonConfig(PATHS),
            stylesConfig.generateStylesConfig(PATHS.app)
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