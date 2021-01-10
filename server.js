import Koa from 'koa';
import Router from 'koa-router';
import 'colors';
import dotenv from 'dotenv';
import bodyParser from 'koa-bodyparser';
import morgan from 'morgan';
import connectDB from './config/db.js';

dotenv.config();
await connectDB();

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 5000;

// 解析请求体
app.use(bodyParser());
// morgan
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.listen(port, () => {
    console.log(`服务器正在${port}端口运行`.green.underline);
});