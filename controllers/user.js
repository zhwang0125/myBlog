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

/**
 * 跳转登录页面
 *
 * @param req
 * @param res
 * @param next
 */
userContr.loginGet = function (req, res, next) {
    res.render('login', {
        title: '登录',
        user: req.session.user,
        errMsg: null
    });
};

/**
 * 登录
 *
 * @body userName   用户名
 * @body passWord   密码
 */
userContr.loginPost = function (req, res, next) {
    var userName = req.body.userName || '';
    var passWord = req.body.passWord || '';

    if (!userName || !passWord) {
        return res.render('login', {
            title: '登录',
            user: req.session.user,
            errMsg: '请输入用户名或密码'
        });
    }

    userDao.findByUserName(userName, function (err, user) {
        if (err) {
            return next(err);
        }

        passWord = md5.update(passWord).digest('hex');

        if (user === null) {
            return res.render('login', {
                title: '登录',
                user: req.session.user,
                errMsg: '用户不存在'
            });
        }

        if (user.passWord !== passWord) {
            return res.render('login', {
                title: '登录',
                user: req.session.user,
                errMsg: '用户名或密码错误'
            });
        }

        req.session.user = user;
        res.redirect('/')
    });
};

module.exports = userContr;