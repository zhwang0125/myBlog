/**
 * 留言表
 * @date 2016/05/23
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    name: String,                                   // 名称
    avatar: String,                                 // 头像
    title: String,                                  // 标题
    comment: String,                                // 留言
    create_at: {type: Date, default: Date.now()}    // 创建时间
});

module.exports = mongoose.model('comment', commentSchema);