const Koa = require('koa');
const path = require('path');
const serve = require('koa-static');
const app = new Koa();
const staticPath = './static';

console.log(path.join(__dirname, staticPath));
app.use(serve(path.join(__dirname, staticPath),{hidden:true}));
// app.use(async ctx => {
//     ctx.body = 'hello world'
// });

app.listen(3000, () => {
    console.log('[demo] static-use-middleware is starting at port 3000')
});

