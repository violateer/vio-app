import Router from 'koa-router';
import Article from '../../models/articleModel.js';
import User from '../../models/userModel.js';

const router = new Router();

/**
 * @route Get api/articles/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */
router.get('/test', async ctx => {
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
router.get('/', async ctx => {
    const articles = await Article.find({}).populate('user', 'name', User);
    if (articles) {
        ctx.status = 200;
        ctx.body = {
            data: articles,
            msg: '查询成功'
        };
    } else {
        ctx.status = 404;
        ctx.body = {
            error: 'NOT FOUND',
            msg: '未查询到任何文章'
        };
    }
});

export default router.routes();