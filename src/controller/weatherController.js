const axios = require('axios');

async function getDataFromAPI(locationParam) {
    try {
        const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${locationParam}&count=1`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        throw error;
    }
}

module.exports = { getDataFromAPI };
