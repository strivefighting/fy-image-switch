const {
    merge
} = require('webpack-merge');
const common = require('./webpack.config-common.js');

module.exports = merge(common, {
    output: {
        filename: 'index-umd.js',
        library: {
            name: 'ImageSwitch',
            type: 'umd',
            export: 'default',
            umdNamedDefine: true
        },
    }
})