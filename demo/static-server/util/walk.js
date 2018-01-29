const fs = require('fs');
const mimes = require('./mime');

/**
 * 遍历读取目录内容（子目录，文件名）
 * @param reqPath 请求资源的绝对路径
 * @returns {Array.<*>} result 目录内容列表
 */
function walk(reqPath) {
    console.log('walk funcion running ');
    let files = fs.readdirSync(reqPath);
    console.log('******', reqPath, files);
    let dirList = [], fileList = [];
    for (let i = 0, len = files.length; i < len; i++) {
        let item = files[i];
        let itemArr = item.split(".");
        console.log('&&&&&&&&&&', itemArr);
        let itemMime = ( itemArr.length > 1 ) ? itemArr[itemArr.length - 1] : "undefined";

        if (typeof mimes[itemMime] === "undefined") {
            dirList.push(files[i]);
        } else {
            fileList.push(files[i]);
        }
    }
    let result = dirList.concat(fileList);
    return result;
};

module.exports = walk;