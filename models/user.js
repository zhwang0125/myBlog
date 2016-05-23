/**
 * 用户表
 * @date 2016/05/23
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userName: String,                               // 用户名
    passWord: String,                               // 密码
    email: String,                                  // 邮箱
    avatar: String,                                 // 头像
    create_at: {type: Date, default: Date.now()}    // 创建时间
});

module.exports = mongoose.model('users', userSchema);