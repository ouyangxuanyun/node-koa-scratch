const Koa = require('koa');
const path = require('path');
const content = require('./util/content');
const mimes = require('./util/mime');

const app = new Koa();
// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static';

// 解析资源类型
function parseMime(url) {
    let extName = path.extname(url);
    extName = extName ? extName.slice(1) : 'unknown';
    return mimes[extName]
}

app.use(async (ctx) => {
    let fullStaticPath = path.join(__dirname, staticPath);  // 静态资源目录在本地的绝对路径
    let _content = await content(ctx, fullStaticPath); // 获取静态资源内容，有可能是文件内容，目录，或404
    let _mime = parseMime(ctx.url); // 解析请求内容的类型
    if (_mime) { // 如果有对应的文件类型，就配置上下文的类型
        ctx.type = _mime;
    }
    if (_mime && _mime.indexOf('image/') >= 0) { // 如果是图片，则用node原生res，输出二进制数据
        ctx.res.writeHead(200);
        ctx.res.write(_content, 'binary');
        ctx.res.end();
    } else {
        ctx.body = _content;
    }
});

app.listen(3000);
console.log('[demo] static-server is starting at port 3000');