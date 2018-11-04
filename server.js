import Koa from 'koa'
// import http from 'http'
import config from './config'
import mongoConnect from './database/mongo'
import { resolve } from 'path'
// const redis = require('./redis');
import middlewares from './middlewares'
import Route from './decorator'
// import https from 'https'



const app = new Koa();

mongoConnect();

middlewares(app);

const router = new Route(app, resolve(__dirname, './routers'));
router.init();


// https.createServer(app.callback()).listen(3001, () => {
// 	console.log('blog-server Run！port at 3001')
// });
app.listen(config.APP.port, () => {
	console.log(`blog-server Run！port at ${config.APP.port}`)
})
