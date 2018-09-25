var htmlPlugin = require('./config').plugins;

module.exports = {
    assetsDir: 'assets/3.0.0',
    productionSourceMap: false,
    filenameHashing: false,
    configureWebpack: {
        plugins: htmlPlugin
    },
    pages: {
        index: {
            entry: 'src/index/main.js'
        }, index2: {
            entry: 'src/index2/main.js'
        }
    }
};
