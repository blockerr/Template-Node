var express = require('express');
var router = express.Router();
var home_servicesController = require('../controller/home_services');
var auth = require('../util/auth');

router.route('/services')
  .post(auth, home_servicesController.create)
  .get(auth, home_servicesController.list)

module.exports = router;