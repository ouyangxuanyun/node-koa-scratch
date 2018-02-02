const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  console.log('********', ctx.url);
  if (ctx.method === 'GET' && ctx.url.split('?')[0] === '/getData.jsonp') {
    let callbackName = ctx.query.callback || 'callback';
    let returnData = {
      success: true,
      data: {
        text: 'this is a jsonp api',
        time: new Date().getTime()
      }
    };

    let jsonStr = `;${callbackName}(${JSON.stringify(returnData)})`;

    ctx.type = 'text/javascript';
    ctx.body = jsonStr;
  } else {
    ctx.body = 'hello jsonp';
  }
});

app.listen(3000, () => {
  console.log('[demo] jsonp is starting at port 3000');
});

// 运行并在浏览器 console页面输入

/**
 * $.ajax({
  url: 'http://localhost:3000/getData.jsonp',
  type: 'GET',
  dataType: 'JSONP',  // jquey的jsonp方法，如果换成JSON 最出现跨域错误，验证了上面的代码
  success: function(res) {
    console.log(res)
  }
  })
 */
