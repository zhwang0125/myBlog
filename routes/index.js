var express = require('express');
var router = express.Router();

var homeContr = require('../controllers/home');

/* GET home page. */
router.get('/', homeContr.index);

module.exports = router;
