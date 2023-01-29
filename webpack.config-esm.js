const {
    merge
} = require('webpack-merge');
const common = require('./webpack.config-common.js');

module.exports = merge(common, {
    experiments: {
        outputModule: true,
    },
    output: {
        filename: 'index-esm.js',
        library: {
            // name: 'ImageSwitch',
            type: 'module',
        },
    }
})