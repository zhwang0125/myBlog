/**
 * 用户表Dao层
 * @type {exports}
 */

var userModel = require('../models/user');

var userDao = {};

/**
 * 保存用户信息
 *
 * @param user  [object] 用户数据
 * @param fn    回调函数
 */
userDao.save = function (user, fn) {
    if (typeof user !== 'object') {
        return fn(new Error('user not is object'), null);
    }

    userModel.create(user, fn);
};

/**
 * 使用用户名查询用户信息
 *
 * @param username  用户名
 * @param fn        回调函数
 */
userDao.findByUserName = function (username, fn) {
    if (typeof username !== 'string') {
        return fn(new Error('username not is string'), null);
    }

    userModel.findOne({username: username}, fn);
};

module.exports = userDao;