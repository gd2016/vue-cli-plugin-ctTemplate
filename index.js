var fs = require('fs');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (api, options) => {
    var files = fs.readdirSync(api.resolve('public'));
    var htmlTemplate = files.filter((f)=>{
        return f.indexOf('.html') !== -1;
    });
    var scriptServer = {
        dev: '//staticadm.tcy365.org:1506/A', //开发版
        test: '//staticadm.tcy365.org:1507/A', //提测版
        testStable: '//staticadm.tcy365.org:1505/A', //测试稳定版
        pre: '//staticadm.tcy365.com:2505/A', //预发版
        official: '//staticadm.tcy365.com/A', //正式版
        docker: '//staticadm.tcy365.{domain_suffix}/A'
    };
    var text = {
        dev: '开发版1506',
        test: '提测版1507',
        testStable: '测试版1505',
        pre: '预发版2505',
        official: '正式版',
        docker: 'docker'
    };

    var config = {
        assetsSubDirectory: options.assetsDir
    };
    var htmlPlugins = [];

    htmlTemplate.map((file)=>{
        var filename = file.split('.')[0];
        var options = {
            template: api.resolve('public') + '/' + file,
            minify: false
        };

        Object.keys(scriptServer).forEach((env)=>{
            var server = scriptServer[env];
            
            options.css = `${server}/${config.assetsSubDirectory}/css/${filename}.css?v=${(+new Date())}`;
            options.js = `${server}/${config.assetsSubDirectory}/js/${filename}.js?v=${(+new Date())}`;
            options.filename = path.resolve(`dist/html/${text[env]}/view/${file}`);
            htmlPlugins.push(new HtmlWebpackPlugin(options));
        });
    });
    api.chainWebpack(webpackConfig => {
    // 通过 webpack-chain 修改 webpack 配置
        webpackConfig
            .optimization
            .splitChunks().clear().end()
            .plugins.delete('named-chunks').end()
            .resolve.modules.prepend('src/untils').end()
            .alias.set('vue$', 'vue/dist/vue.esm.js').end();
    });
    api.configureWebpack(webpackConfig => {
    // 修改 webpack 配置
    // 或返回通过 webpack-merge 合并的配置对象
        if (process.env.NODE_ENV === 'production'){
            return {
                plugins: htmlPlugins
            };
        }
    });
};
