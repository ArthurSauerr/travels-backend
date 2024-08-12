const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { validateToken } = require('../security/auth');

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.delete('/delete', validateToken, userController.deleteUser);
router.get('/read', userController.readUser);

module.exports = router;