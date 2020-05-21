var express = require('express');
var router = express.Router();
var home_introduceController = require('../controller/home_introduce');
var auth = require('../util/auth');

router.route('/introduces')
  .post(auth, home_introduceController.create)
  .get(auth, home_introduceController.list)

module.exports = router;