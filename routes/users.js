var express = require('express');
var router = express.Router();

const { addUser, getUser, getUsers, deleteUser } = require("../dynamodb");

/* GET users listing. */
router.get('/', getUsers);
router.post('/', addUser);
router.get('/:id', getUser);
router.delete('/:id', deleteUser);

module.exports = router;
