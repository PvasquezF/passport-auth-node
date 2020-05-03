const express = require('express');
const router = express.Router({ mergeParams: true });
const { getLogin, getRegister, register, login, logout } = require('../controllers/users');

router.get('/login', getLogin);
router.get('/register', getRegister);
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;