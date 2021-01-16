import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

/**
 * @description 根据创建时间生成文件夹
 */
export function getUploadDirname () {
    const date = new Date();
    let month = Number.parseInt(date.getMonth()) + 1;
    month = month.toString().length > 1 ? month : `0${month}`;
    const dir = `${date.getFullYear()}-${month}-${date.getDate()}`;
    return dir;
}

/**
 * @param {string} p
 * @description 判断文件夹是否存在，如果不存在则创建文件夹
 */
export function checkDirExist (p) {
    if (!fs.existsSync(p)) {
        fs.mkdirSync(p);
    }
}

/**
 * @param {string} name
 * @description 获取文件夹后缀
 */
export function getUploadFileExt (name) {
    const ext = name.split('.');
    return ext[ext.length - 1];
}

/**
 * @param {string} name
 * @param {string} ext
 * @description 生成文件名字
 */
export function getUploadFileName (name, ext) {
    const trueName = name.split('.')[0];
    const uuid = uuidv4();
    return `${trueName}[${uuid}].${ext}`;
}

/**
 * @param {string} path
 * @description promise封装fs.readFile
 */
export function pReadFile (path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

