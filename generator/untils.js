var fs = require('fs');

module.exports = (api, options) => {
    return {
        fsRename(oldFile, newFile){
            fs.rename(oldFile, newFile, function(err){
                if (err){
                    throw err;
                }
            }); 
        }
    };
}
;
