var express = require('express');
var router = express.Router();
var home_slideController = require('../controller/home_slide');
var auth = require('../util/auth');

router.route('/slide')
  .post(auth, home_slideController.create)
  .get(auth, home_slideController.list)

module.exports = router;