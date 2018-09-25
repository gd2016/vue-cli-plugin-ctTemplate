module.exports = (api, options) => {
  // 复制并用 ejs 渲染 `./template` 内所有的文件
    api.render(files => {
      Object.keys(files)
        .filter(path => path.startsWith('src/'))
        .forEach(path => delete files[path])
    })
    api.render('./templates');
    api.extendPackage({
      vue: {
        assetsDir: 'assets/1.0.0',
        productionSourceMap: false,
        filenameHashing: false
      },
    })
}