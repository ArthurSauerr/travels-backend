const express = require('express');
const router = express.Router();
const postsController = require('../controller/postsController');
const { validateToken } = require('../security/auth');

router.post('/new-post', validateToken, postsController.newPost);

module.exports = router;