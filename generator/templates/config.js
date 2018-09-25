var fs = require('fs');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var files = fs.readdirSync(path.resolve(__dirname, 'public'));
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
    assetsPublicPath: 'ct108-admin-test',
    assetsSubDirectory: 'assets',
    version: '3.0.0'
};
var htmlPlugins = [];

htmlTemplate.map((file)=>{
    var filename = file.split('.')[0];
    var options = {
        inject: false,
        template: path.resolve('public', file),
        minify: false
    };

    Object.keys(scriptServer).forEach((env)=>{
        var server = scriptServer[env];
        
        options.css = `${server}/${config.assetsPublicPath}/${config.assetsSubDirectory}/${config.version}/css/${filename}.css?v=${(+new Date())}`;
        options.js = `${server}${config.assetsPublicPath}/${config.assetsSubDirectory}/${config.version}/js/${filename}.js?v=${(+new Date())}`;
        options.filename = path.resolve(`dist/html/${text[env]}/view/${file}`);
        htmlPlugins.push(new HtmlWebpackPlugin(options));
    });
});
module.exports.plugins = htmlPlugins;
