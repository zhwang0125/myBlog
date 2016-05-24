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

        // 格式化时间
        result.forEach(function (item) {
            var date = item.create_at;
            item.time = {
                date: date,
                year : date.getFullYear(),
                month : date.getFullYear() + "-" + (date.getMonth() + 1),
                day : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
                minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
                date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
            };
        });

        res.render('index', {
            title: '主页',
            user: req.session.user,
            items: result
        });
    });
};

module.exports = homeContr;