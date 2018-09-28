var fs = require('fs');

module.exports = (api, options) => {
    // var render = require('render')(api, options);
    // var untils = require('untils')(api, options);

    console.log('generator', options);
    if (options.way === 'initial'){
        api.render(files => {
            delete files['public/favicon.ico'];
            delete files['public/index.html'];
            delete files['src/App.vue'];
            delete files['src/main.js'];
        });
        if (options.operation.indexOf('add') !== -1){
            api.render('./templates/src/page-name/add.vue');        
        }
    }
    const files = fs.readdirSync(api.resolve('public'));
    const htmlFile = files.filter((f) => {
        return f.indexOf('.html') !== -1;
    });

    htmlFile.push(options.fileName + '.html');
    api.render('./templates', {fileName: htmlFile});
    const pageConfig = {};

    pageConfig[options.fileName] = `src/page/${options.fileName}/main.js`;

    api.extendPackage({
        devDependencies: {
            'eslint-plugin-html': '^4.0.6',
            'ct-adc-formitem': '^1.0.2',
            'async-validator': '^1.8.4',
            'ct-adc-const': '^1.0.0-alpha.3',
            'ct-adc-list': '^4.2.0',
            'ct-adc-loading': '^1.0.0-alpha.3',
            'ct-adc-mini-msg': '^2.0.0',
            'ct-adc-page': '^1.1.0',
            'ct-adc-permission': '^1.1.0',
            'ct-adc-slideout': '^1.2.0',
            'ct-adc-popper': '^2.0.1'
        },
        vue: {
            assetsDir: 'ct108-admin-main/assets/1.0.0',
            productionSourceMap: false,
            filenameHashing: false,
            pages: pageConfig,
            devServer: {
                open: true,
                openPage: 'index.html',
                setup: function(app) {
                    app.get('/index.html', function(req, res) {
                        res.sendFile(__dirname + '/src/index.html');
                    });
                }
            }
        }
    });

    api.onCreateComplete(()=>{
        fs.rename(`${api.resolve('public')}/page-name.html`,
            `${api.resolve('public')}/${options.fileName}.html`); 
        fs.rename(`${api.resolve('src')}/page/page-name`,
            `${api.resolve('src')}/page/${options.fileName}`);      
    });
};
