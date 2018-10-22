import Koa from 'koa'
import Router from 'koa-router'
import multer from 'koa-multer'
import path from 'path'
import serve from 'koa-static'
import cors from 'koa2-cors'
const app = new Koa();

let storage = multer.diskStorage({
	destination: path.resolve('upload'),
	filename: function (req, file, cb) {    var fileFormat = (file.originalname).split(".");    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);  
}


});

let upload = multer({ storage: storage});

app.use(cors({
	origin: function () {
		return "http://localhost:8080"
	},
	'Access-Control-Allow-Credentials': 'true',
	credentials: true,
	'Access-Control-Allow-Headers': 'Authorization, Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With',
	'Access-Control-Allow-Methods': 'PUT,PATCH,POST,GET,DELETE,OPTIONS'
}))

app.use(serve(__dirname+'/upload',{extensions: ['png','jpg']}));
let router = new Router();
router.post('/uploads', upload.single('file'), async ctx => {
    if (ctx.req.file){
			ctx.body = {
				filename: ctx.req.file.filename//返回文件名
			}		
    } else {
        ctx.body = 'upload error';
    }
});
app.use(router.routes());



app.listen('7777', () => {
	console.log('blog-server Run！port at 7777')
})

// const serve = require('koa-static');
// const Koa = require('koa');
// const app = new Koa();
 
// $ GET /package.json
// app.use(serve('./upload'));
 
// // $ GET /hello.txt
// app.use(serve('upload/'));
 
// or use absolute paths
// app.use(serve(__dirname + '/upload'));
 
// app.listen(3000);
 
// console.log('listening on port 3000');