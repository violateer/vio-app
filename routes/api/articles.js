import Router from 'koa-router';
import fs from 'fs';
import { pReadFile } from '../../config/tools.js';

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
    const labels = ctx.request.body.labels.split(',');
    const path = '\\' + file.file.path.split('\\').splice(1).join('\\');
    let content;
    await pReadFile(file.file.path).then(data => {
        content = data.toString();
        if (!content) {
            fs.unlink(file.file.path, err => {
                console.log(err);
            });
        }
    }).catch(err => {
        fs.unlink(file.file.path, err => {
            console.log(err);
        });
    });
    const article = new Article({
        title,
        author,
        md: path,
        content,
        labels
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
 * @route Get api/articles/:id
 * @desc 获取文件接口地址
 * @access 接口是公开的
 **/
router.get('/:id', async ctx => {
    const { id } = ctx.params;
    const article = await Article.findById(id);
    if (!article) {
        ctx.status = 404;
        return;
    }
    const path = 'static' + article.md.split('\\').slice(0).join('/');
    const articleConf = article;
    await pReadFile(path).then(data => {
        ctx.body = {
            data: {
                articleConf,
                mdContent: data.toString(),
                msg: '查询成功'
            },
            code: 200
        };
    }).catch(err => {
        ctx.status = 404;
    });
});

export default router.routes();
