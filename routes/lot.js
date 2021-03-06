var express = require('express');
var router = express.Router();
var lotController = require('../controller/lot');
var auth = require('../util/auth');

/* GET users listing. */
router.route('/lots')
  .post(auth, lotController.create)
  .get(auth, lotController.list)

  router.route('/lot/:lotNumber')
  .post(auth, lotController.lot)


module.exports = router; 
 