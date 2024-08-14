const express = require('express');
const router = express.Router();
const travelsController = require('../controller/travelsController');
const { validateToken } = require('../security/auth');

router.post('/new-travel', validateToken, travelsController.newTravel);
router.get('/get-all-travels', validateToken, travelsController.getTravelsByUserId);
router.get('/get-travel', travelsController.getTravelById);
router.delete('/delete-travel', validateToken, travelsController.deleteTravel);

module.exports = router;