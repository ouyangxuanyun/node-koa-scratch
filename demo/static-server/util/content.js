const path = require('path');
const fs = require('fs');
const dir = require('./dir');// 封装读取目录内容方法
const file = require('./file');// 封装读取文件内容方法

/**
 * 获取静态资源内容
 * @param  {object} ctx koa上下文
 * @param  {string} fullStaticPath 静态资源目录在本地的绝对路径
 * @return  {string} 请求获取到的本地内容
 */
async function content(ctx, fullStaticPath) {
    let reqPath = path.join(fullStaticPath, ctx.url);// 封装请求资源的完绝对径
    console.log('------content function running-----------', reqPath);
    let exist = fs.existsSync(reqPath);// 判断请求路径是否为存在目录或者文件
    let content = '';// 返回请求内容， 默认为空
    if (!exist) {
        //如果请求路径不存在，返回404
        content = '404 Not Found! o(╯□╰)o！'
    } else {
        let stat = fs.statSync(reqPath)//判断访问地址是文件夹还是文件
        if (stat.isDirectory()) {
            content = dir(ctx.url, reqPath)//如果为目录，则渲读取目录内容
        } else {
            content = await file(reqPath)// 如果请求为文件，则读取文件内容
        }
    }
    return content
}

module.exports = content;