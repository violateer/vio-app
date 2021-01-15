import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// 文章模型
const articleSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        default:'600153de2dcbb2109ca38315'
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    reviewNum: {
        type: Number,
        required: true,
        default: 0
    },
    pageViews: {
        type: Number,
        required: true,
        default: 0
    },
    content: {
        type: String,
        required: true
    },
    md: {
        type: String,
        required: true
    },
    labels: {
        type: Array
    }
}, { timestamps: true });

const Article = mongoose.model('Article', articleSchema);
export default Article;