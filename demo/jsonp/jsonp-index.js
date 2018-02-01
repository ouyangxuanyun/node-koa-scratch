const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  if (ctx.method === 'GET' && ctx.url.split('?')[0] === '/getData.json') {
    let callbackName = ctx.query.callback || 'callback';
    let returnData = {
      success: true,
      data: {
        text: 'this is a jsonp api',
        time: new Date().getTime()
      }
    };
  }
});