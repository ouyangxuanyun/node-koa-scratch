const fs = require('fs');

const walkFile = (pathResolve, mime) => {
    let files = fs.readdirSync(pathResolve);
    console.log('walkFile -- files: ', files);
    let fileList = {};
    for (let [i, item] of files.entries()) {
        let itemArr = item.split('.');
        let itemMime = (itemArr.length > 1) ? itemArr[itemArr.length - 1] : 'undefined';
        let keyName = item + '';
        if (mime === itemMime) {
            fileList[item] = pathResolve + item;
        }
    }
    console.log('**** walkFile **** fileList: ', fileList);
    return fileList;
}

module.exports = walkFile;