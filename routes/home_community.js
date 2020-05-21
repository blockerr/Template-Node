var express = require('express');
var router = express.Router();
var home_communityController = require('../controller/home_community');
var auth = require('../util/auth');

router.route('/communitys')
  .post(auth, home_communityController.create)
  .get(auth, home_communityController.list)

module.exports = router;