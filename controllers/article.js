/**
 * 文章controllers层
 * @date 2015/05/24
 */

var articleDao = require('../proxy/article');

var articleContr = {};

/**
 * 跳转发表页面
 * @param req
 * @param res
 * @param next
 */
articleContr.createGet = function (req, res, next) {
    res.render('article', {
        title: '发表',
        user: req.session.user
    });
};

/**
 * 发表文章
 *
 * @body title      文章
 * @body content    内容
 * @body tags       标签
 */
articleContr.createPost = function (req, res, next) {
    var title = req.body.title;
    var content = req.body.content;
    var tags = [
        req.body.tag1 || '',
        req.body.tag2 || '',
        req.body.tag3 || ''
    ];

    if (!title || !content) {
        return;
    }

    var article = {
        userName: req.session.user.userName,
        title: title,
        content: content,
        tags: tags
    };

    articleDao.create(article, function (err, result) {
        if (err) {
            return next(err);
        }

        res.redirect('/')
    });
};

module.exports = articleContr;