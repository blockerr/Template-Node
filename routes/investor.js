var express = require('express');
var router = express.Router();
var investortController = require('../controller/investor');
var auth = require('../util/auth');
var multer = require('multer');
var upload = multer()

/* GET users listing. */
router.route('/investors')
  .post(auth, investortController.create)
  .get(auth, investortController.list)

router.route('/investor/:id')
  .put(auth, investortController.update)
  .delete(auth, investortController.delete)
  .get(auth, investortController.investor)

router.route('/investor/avatar/:id')
  .put(auth, upload.single('avatar'), investortController.updateAvatar)

module.exports = router;
