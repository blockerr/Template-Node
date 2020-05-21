var express = require('express');
var router = express.Router();
var home_advantageController = require('../controller/home_advantage');
var auth = require('../util/auth');

router.route('/advantages')
  .post(auth, home_advantageController.create)
  .get(auth, home_advantageController.list)

module.exports = router;