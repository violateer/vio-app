import Koa from 'koa';
import Router from 'koa-router';
import 'colors';
import dotenv from 'dotenv';
import bodyParser from 'koa-bodyparser';
import cors from 'koa-cors';
import connectDB from './config/db.js';
// 引入路由
import articles from './routes/api/articles.js';

dotenv.config();

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 5000;

// 处理跨域
app.use(cors());
// 解析请求体
app.use(bodyParser());
// 连接数据库
await connectDB();
// 处理跨域

// 配置路由地址
router.use('/api/articles', articles);

// 配置路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log(`服务器正在${port}端口运行`.green.underline);
});
