var express = require('express');
var router = express.Router();

var homeContr = require('../controllers/home');
var userContr = require('../controllers/user');

/** 主页 */
router.get('/', homeContr.index);

/** 注册 */
router.get('/reg', userContr.registerGet);
router.post('/reg', userContr.registerPost);

module.exports = router;
