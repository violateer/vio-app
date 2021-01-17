/**
 * @desc 错误码
 */
const errCode = {
    404: 'NOT FOUND',
    403: 'FORBIDDEN',
    500: 'SERVER ERROR',
    default: '未定义的错误码'
};

/**
 * @desc 错误处理中间件
 */
export function * errHandler (next) {
    yield next;
    const status = parseInt(this.status);
    if (status in errCode) {
        this.status = 200;
        this.body = {
            data: {
                msg: errCode[status]
            },
            code: status
        };
    }
}