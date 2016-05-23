/**
 * 主页controllers层
 * @date 2016/05/23
 */

var articleDao = require('../proxy/article');

var homeContr = {};

/**
 * 主页路由入口
 *
 * @date 2016/05/23
 * @query page  第几页
 */
homeContr.index = function (req, res, next) {
    var page = req.query.page || 1;

    articleDao.findList({}, page, function (err, result) {
        if (err) {
            return next(err);
        }

        res.render('index', {
            title: '主页',
            user: req.session.user
        });
    });
};

module.exports = homeContr;