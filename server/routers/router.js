const express = require('express');
const router = express.Router();
const controller = require('../controller.js');

router.route('/region=:region/username=:username')
  .post(controller.post);

module.exports = router;