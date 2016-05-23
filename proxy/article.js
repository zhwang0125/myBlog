/**
 * 文章DAO层
 * @date 2016/05/23
 */

var articleModel = require('../models/article');
var async = require('async');
var config = require('../config');

var articleDao = {};

/**
 * 分页查询文章的方法
 *
 * @param conditions    查询条件
 * @param page          第几页
 * @param fn            回调函数
 */
articleDao.findList = function (conditions, page, fn) {
    var pageSize = config.pageSize;

    async.parallel([
        function (cb) {
            articleModel
                .find(conditions)
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .exec(function (err, articles) {
                    cb(err, articles);
                });
        },
        function (cb) {
            articleModel.count(conditions, function (err, count) {
                cb(err, count);
            });
        }
    ], function (err, result) {
        if (err) {
            return fn(err, null, null);
        }

        // 分页信息
        var pageInfo = {
            pageCount: Math.ceil(result[1] / pageSize),
            page: page,
            pageSize: pageSize
        };

        fn(err, result[0], pageInfo);
    });
};

module.exports = articleDao;