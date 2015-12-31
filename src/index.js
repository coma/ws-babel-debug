import polyfill from './polyfill';
import Koa from 'koa';
import other from './other';

new Koa()
    .use(async ctx => {

        ctx.body = await other();
    })
    .listen(process.env.PORT);
