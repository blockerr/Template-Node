var express = require('express');
var router = express.Router();
var adminController = require('../controller/admin');

/* GET users listing. */
router.route('/admin/signup')
  .post(adminController.signup)

router.route('/admin/signin')
  .post(adminController.signin)
  
module.exports = router;
