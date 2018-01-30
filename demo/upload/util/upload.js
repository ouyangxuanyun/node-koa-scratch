const inspect = require('util').inspect;
const path = require('path');
const os = require('os');
const fs = require('fs');
const Busboy = require('busboy');

/**
 * 同步创建文件目录
 * @param {string} dirname 目录绝对地址
 * @returns {boolean}  创建目录结果
 */
const mkdirsSync = dirname => {
    console.log('检查并创建文件：', dirname);
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
};

/**
 * 获取上传文件的后缀名
 * @param {string} fileName 获取上传文件的后缀名
 * @returns {string} 文件后缀名
 */
const getSuffixName = fileName => {
    let nameList = fileName.split('.');
    return nameList[nameList.length - 1];
};

const uploadFile = (ctx, options) => {
    let [req, res] = [ctx.req, ctx.res];
    let busboy = new Busboy({headers: req.headers});

    //获取类型
    let fileType = options.fileType || 'common';
    let filePath = path.join(options.path, fileType);
    let mkdirResult = mkdirsSync(filePath);

    return new Promise((resolve, reject) => {
        console.log('文件上传中...');
        let result = {
            success: false,
            formData: {},
        }

        //解析请求文件事件
        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => { //fieldname是file,file是文件流，filename是上传的文件名称
            // console.log('***********',fieldname,file,filename);
            let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename);
            let _uploadFilePath = path.join(filePath, fileName);
            let saveTo = path.join(_uploadFilePath);

            file.pipe(fs.createWriteStream(saveTo));

            // 文件写入事件结束
            file.on('end', function () {
                result.success = true
                result.message = '文件上传成功'

                console.log('文件上传成功！')
                resolve(result)
            })
        })
        // 解析表单中其他字段信息
        busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
            console.log('表单字段数据 [' + fieldname + ']: value: ' + inspect(val));
            result.formData[fieldname] = inspect(val);
        });

        // 解析结束事件
        busboy.on('finish', function () {
            console.log('文件上结束')
            resolve(result)
        })

        // 解析错误事件
        busboy.on('error', function (err) {
            console.log('文件上出错')
            reject(result)
        })
        req.pipe(busboy);
    })
};

module.exports = {
    uploadFile
}