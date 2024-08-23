const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { validateToken } = require('../security/auth');

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/read', userController.readUser);
router.put('/update', validateToken, userController.updateUser);
router.delete('/delete', validateToken, userController.deleteUser);

module.exports = router;