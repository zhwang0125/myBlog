var articleDao = require('../proxy/article');

var homeContr = {};

/**
 * 博客主页
 * @param req
 * @param res
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