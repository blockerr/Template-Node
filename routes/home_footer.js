var express = require('express');
var router = express.Router();
var home_footerController = require('../controller/home_footer');
var auth = require('../util/auth');

router.route('/footers')
  .post(auth, home_footerController.create)
  .get(auth, home_footerController.list)

module.exports = router;