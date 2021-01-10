import Router from 'koa-router';

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

export default router.routes();