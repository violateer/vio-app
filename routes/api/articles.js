import Router from 'koa-router';
import fs from 'fs';
import marked from 'marked';

// 引入模板
import Article from '../../models/articleModel.js';
import User from '../../models/userModel.js';

const router = new Router();

/**
 * @route Get api/articles/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */
router.get('/test', async (ctx) => {
    ctx.status = 200;
    ctx.body = {
        msg: 'articles works....'
    };
});

/**
 * @route Get api/articles
 * @desc 获取所有文章接口地址
 * @access 接口是公开的
 **/
router.get('/', async (ctx) => {
    const articles = await Article.find({}).populate('user', 'name', User);
    if (articles) {
        ctx.status = 200;
        ctx.body = {
            data: {
                articles,
                msg: '查询成功'
            },
            code: 200
        };
    } else {
        ctx.status = 404;
        ctx.body = {
            data: {
                msg: 'NOT FOUND'
            },
            code: 404
        };
    }
});

/**
 * @route Post api/articles
 * @desc 上传文件接口地址
 * @access 接口是公开的
 **/
router.post('/', async ctx => {
    const file = ctx.request.files;
    const { title, author } = JSON.parse(ctx.request.body.extraData);
    const path = file.file.path.split('\\').splice(1).join('\\');
    const article = new Article({
        title,
        author,
        md: path,
        content: 'test'
    });
    try {
        await article.save();
        ctx.status = 201;
        ctx.body = {
            data: {
                files: JSON.stringify(file),
                msg: '上传成功'
            },
            code: 201
        };
    } catch (err) {
        ctx.status = 500;
        ctx.body = {
            data: {
                msg: '上传失败'
            },
            code: 500
        };
    }
});

/**
 * @route Get api/articles/:folder/:date/:file
 * @desc 获取文件接口地址
 * @access 接口是公开的
 **/
router.get('/:folder/:date/:file', async ctx => {
    const { folder, date, file } = ctx.params;
    const path = `static/${folder}/${date}/${file}`;
    const data = fs.readFileSync(path);
    // fs.readFile(path, function (err, data) {
    if (!data) {
        ctx.status = 404;
        ctx.body = {
            data: {
                msg: '文件不存在'
            },
            code: 404
        };
    } else {
        ctx.status = 200;
        ctx.body = {
            data: {
                article: data.toString(),
                msg: '查询成功'
            },
            code: 200
        };
    }
// });
});

export default router.routes();
