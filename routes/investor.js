var express = require('express');
var router = express.Router();
var investortController = require('../controller/investor');
var auth = require('../util/auth');

/* GET users listing. */
router.route('/investors')
  .post(auth, investortController.create)
  .get(auth, investortController.list)

module.exports = router;
