/**
 * 用户相关controllers层
 * @date 2016/05/23
 */

var userDao = require('../proxy/user');
var crypto = require('crypto');
var md5 = md5 = crypto.createHash('md5');

var userContr = {};

/**
 * 用户注册页面跳转
 * @param req
 * @param res
 * @param next
 */
userContr.registerGet = function (req, res, next) {
    res.render('register', {
        title: '注册',
        user: req.session.user
    });
};

/**
 * 用户注册，Post提交数据
 *
 * @date 2016/05/23
 * @query userName          用户名
 * @query passWord          密码
 * @query passWordRepeat    密码二次
 * @query email             邮箱
 */
userContr.registerPost = function (req, res, next) {
    var userName = req.body.userName;
    var passWord = req.body.passWord;
    var passWordRepeat = req.body.passWordRepeat;
    var email = req.body.email;

    if (passWord !== passWordRepeat) {
        return;
    }

    var user = {
        userName: userName,
        passWord: md5.update(passWord).digest('hex'),
        email: email
    };

    userDao.save(user, function (err, result) {
        if (err) {
            return next(err);
        }

        res.redirect('/');
    });
};

module.exports = userContr;