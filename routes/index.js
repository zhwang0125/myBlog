var express = require('express');
var router = express.Router();

var homeContr = require('../controllers/home');
var userContr = require('../controllers/user');
var articleContr = require('../controllers/article');

/** 主页 */
router.get('/', homeContr.index);

/** 注册 */
router.get('/reg', userContr.registerGet);
router.post('/reg', userContr.registerPost);

/** 登录 */
router.get('/login', userContr.loginGet);
router.post('/login', userContr.loginPost);

/** 发表文章 */
router.get('/article', articleContr.createGet);
router.post('/article', articleContr.createPost);

module.exports = router;
