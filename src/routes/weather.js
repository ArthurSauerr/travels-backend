const express = require('express');
const router = express.Router();
const { getLocationByName } = require('../controller/weatherController');

router.get('/search', async (req, res) => {
    const queryParam = req.query.q;

    try {
        const data = await getLocationByName(queryParam);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar dados da API externa' });
    }
});

module.exports = router;