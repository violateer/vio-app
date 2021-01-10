import 'colors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
// 引入data数据
import users from './data/users.js';
import articles from './data/articles.js';
// 引入模板
import Article from './models/articleModel.js';
import User from './models/userModel.js';

dotenv.config();
await connectDB();

// 插入数据
const insertData = async () => {
    try {
        // 清空数据
        await User.deleteMany();
        await Article.deleteMany();
        
        // 插入数据
        const createdUsers = await User.insertMany(users);
        const firstUserId = createdUsers[0]._id;
        
        const newArticles = articles.map(article => {
            return { ...article, user: firstUserId };
        });
        await Article.insertMany(newArticles);
        
        console.log('样本数据插入成功'.green.inverse);
        process.exit(0);
    } catch (err) {
        console.log(`Error：${err}`.red.inverse);
        process.exit(1);
    }
};

// 销毁数据
const destroyData = async () => {
    try {
        // 清空数据
        await User.deleteMany();
        await Article.deleteMany();
        
        console.log('样本数据销毁成功'.green.inverse);
        process.exit(0);
    } catch (err) {
        console.log(`Error：${err}`.red.inverse);
        process.exit(1);
    }
};

// 判断命令行执行的函数
if (process.argv[2] === '-d') {
    await destroyData();
} else {
    await insertData();
}