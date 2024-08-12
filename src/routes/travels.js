const express = require('express');
const router = express.Router();
const travelsController = require('../controller/travelsController');
const { validateToken } = require('../security/auth');

router.post('/new-travel', validateToken, travelsController.newTravel);
router.get('/travels', validateToken, travelsController.getTravelsByUserId);
router.delete('/delete-travel', validateToken, travelsController.deleteTravel);

module.exports = router;