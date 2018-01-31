const fs = require('fs');
const walkFile = require('./walk-file');

const getSqlMap = () => {
    let basePath = __dirname.replace(/\\/g, '\/');
    let pathArr = basePath.split('\/');
    pathArr = pathArr.splice(0, pathArr.length - 1);
    basePath = pathArr.join('/') + '/sql/';
    console.log('basePath: ',basePath);
    let fileList = walkFile(basePath, 'sql');
    return fileList;
};

module.exports = getSqlMap;