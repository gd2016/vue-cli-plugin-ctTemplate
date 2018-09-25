module.exports = (api, options) => {
  api.chainWebpack(webpackConfig => {
    // 通过 webpack-chain 修改 webpack 配置
    webpackConfig
        .optimization
        .splitChunks()
        .clear().end()
        .plugins.delete('named-chunks').end();
  })
}