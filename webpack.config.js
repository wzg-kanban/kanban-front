const path = require('path');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const serverConfig = require('./webpack/server.config');
const commonConfig = require('./webpack/common.config');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

var config;

switch (process.env.npm_lifecycle_event) {
    case 'build':
        console.log('Build config selected!\n');
        config = commonConfig.generateCommonConfig(PATHS);
        break;
    default:
        console.log('Default config selected!\n');
        config = merge(
            commonConfig.generateCommonConfig(PATHS),
            serverConfig.generateServerConfig()
        );
}

module.exports = validate(config);