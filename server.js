import Koa from 'koa';
import Router from 'koa-router';
import path from 'path';
import 'colors';
import dotenv from 'dotenv';
import bodyParser from 'koa-bodyparser';
import koaBody from 'koa-body';
import staticFiles from 'koa-static';
import connectDB from './config/db.js';
import { getUploadDirname, checkDirExist, getUploadFileExt, getUploadFileName } from './config/tools.js';
// 引入路由
import articles from './routes/api/articles.js';
import { errHandler } from './middles/errorHandler.js';

dotenv.config();

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 5000;

// 设置静态资源文件夹
const __dirname = path.resolve();
app.use(staticFiles(path.join(__dirname, 'static')));
// 处理跨域
app.use(async (ctx, next) => {
    ctx.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
        'X-Powered-By': ' 3.2.1'
    });
    if (ctx.method == 'OPTIONS') {
        // 让options请求快速返回
        ctx.body = 200;
    } else {
        await next();
    }
});
// 解析请求体
app.use(bodyParser());
// koaBody
app.use(koaBody({
    multipart: true, // 支持文件上传
    encoding: 'gzip',
    formidable: {
        uploadDir: path.join(__dirname, 'static/markdowns/'), // 设置文件上传目录
        keepExtensions: true,    // 保持文件的后缀
        hash: false,
        maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
        onFileBegin: (name, file) => { // 文件上传前的设置
            // 获取文件后缀
            const ext = getUploadFileExt(file.name);
            // 最终要保存到的文件夹目录
            const dir = path.join('static', 'markdowns', `${getUploadDirname()}`);
            // 检查文件夹是否存在如果不存在则新建文件夹
            checkDirExist(dir);
            // 重新覆盖 file.path 属性
            file.path = path.join(`${dir}`, `${getUploadFileName(file.name, ext)}`);
        },
        onError: (err) => {
            console.log(err);
        }
    }
}));
// 连接数据库
await connectDB();
// 处理对应错误码
app.use(errHandler);

// 配置路由地址
router.use('/api/articles', articles);

// 配置路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log(`服务器正在${port}端口运行`.green.underline);
});
