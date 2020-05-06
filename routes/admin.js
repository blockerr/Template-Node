var express = require('express');
var router = express.Router();
var adminController = require('../controller/admin');
var auth = require('../util/auth');

/* GET users listing. */
router.route('/admin/signup')
  .post(adminController.signup)

router.route('/admin/signin')
  .post(adminController.signin)

router.route('/admins')
  .get(auth, adminController.list)

router.route('/admin/:id')
  .put(auth, adminController.update)
  .delete(auth, adminController.delete)

router.route('/admin/password')
  .post(auth, adminController.changePassword)

module.exports = router;
