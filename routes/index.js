var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET home page. */
router.get('/test', function (req, res, next) {
  models.User.findAll({}).then((response) => {
    res.json(response);
  });
});

module.exports = router;
