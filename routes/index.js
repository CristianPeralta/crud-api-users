var express = require('express');
var router = express.Router();

const { listTables } = require("../dynamodb");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tables', listTables);

module.exports = router;
