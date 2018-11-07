var fs = require('fs');

module.exports = (api, options) => {
    if (options.fileName){
        const files = fs.readdirSync(api.resolve('public'));
        const htmlFile = files.filter((f) => {
            return f.indexOf('.html') !== -1;
        });
        const pageConfig = {};

        htmlFile.push(options.fileName + '.html');
        api.render({
            './public/page-name.html': './templates/public/page-name.html',
            './src/page/page-name/main.js': './templates/src/page/page-name/main.js',
            './src/page/page-name/router.js': './templates/src/page/page-name/router.js',
            './src/page/page-name/component/App.vue': './templates/src/page/page-name/component/App.vue',
            './src/index.html': './templates/src/index.html'
        }, {fileName: htmlFile});
        if (options.operation.indexOf('add') !== -1 && !options.isHandle){
            api.render({'./src/page/page-name/component/add.vue': './templates/src/page/page-name/component/add.vue'});
        }
        if (options.operation.indexOf('edit') !== -1 && !options.isHandle){
            api.render({'./src/page/page-name/component/edit.vue': './templates/src/page/page-name/component/edit.vue'});
        }
        if (options.isHandle){
            api.render({'./src/page/page-name/component/handle.vue': './templates/src/page/page-name/component/handle.vue'});
        }
        if (options.operation.indexOf('search') !== -1){
            api.render({'./src/page/page-name/component/search.vue': './templates/src/page/page-name/component/search.vue'});
        }
        if (options.operation.indexOf('view') !== -1){
            api.render({'./src/page/page-name/component/view.vue': './templates/src/page/page-name/component/view.vue'});
        }
        pageConfig[options.fileName] = `src/page/${options.fileName}/main.js`;
        api.extendPackage({
            vue: {
                pages: pageConfig
            }
        });

        api.onCreateComplete(()=>{
            fs.rename(`${api.resolve('public')}/page-name.html`,
                `${api.resolve('public')}/${options.fileName}.html`); 
            fs.rename(`${api.resolve('src')}/page/page-name`,
                `${api.resolve('src')}/page/${options.fileName}`);      
        });
    }
};
