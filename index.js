const Koa = require('koa');
const fs = require('fs');
const app = new Koa();

const render = (page) => {
  return new Promise((res, rej) => {
    let viewUrl = `./view/${page}`;
    fs.readFile(viewUrl, 'binary', (err, data) => {
      err ? rej(err) : res(data);
    });
  });
};

const route = async (url) => {
  let view = '404.html';
  switch (url) {
    case '/':
      view = 'index.html';
      break;
    case '/index':
      view = 'index.html';
      break;
    case '/todo':
      view = 'todo.html';
      break;
    case '404.html':
      view = '404.html';
      break;
    default:
      break;
  }
  let html = await render(view);
  return html;
};

app.use(async (ctx) => {
  let url = ctx.request.url;
  let html = await route(url);
  ctx.body = html;
});

app.listen(3300);
console.log('demo route starting at port 3300');