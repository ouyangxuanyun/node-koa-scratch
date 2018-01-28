const Koa = require('koa');
const app = new Koa();
const loggerAsync  = require('./middleware/logger-async')
const port = 3000;

app.use(loggerAsync());
app.use(async (ctx) => {
    ctx.body = 'hello koa2';
});

app.listen(port);
console.log(`app start at port ${port}`);


