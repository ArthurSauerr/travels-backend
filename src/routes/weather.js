const express = require('express');
const router = express.Router();
const { getDataFromAPI } = require('../controller/weatherController');

router.get('/search', async (req, res) => {
    const queryParam = req.query.q;

    try {
        const data = await getDataFromAPI(queryParam);
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar dados da API externa' });
    }
});

module.exports = router;