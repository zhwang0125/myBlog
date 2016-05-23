/**
 * 文章表
 * @date 2016/05/23
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    name: String,                               // 名称
    avatar: String,                             // 头像
    title: String,                              // 标题
    tags: Array,                                // 标签
    content: String,                            // 内容
    comments: Array,                            // 评论留言
    pv: {type: Number, default: 0},
    create_at: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('user', articleSchema);