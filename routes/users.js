var express = require('express');
var router = express.Router();

const { addUser } = require("../dynamodb");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', addUser);

module.exports = router;
