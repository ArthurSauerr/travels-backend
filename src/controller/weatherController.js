const axios = require('axios');

async function getLocationByName(locationParam) {
    try {
        const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${locationParam}&count=1`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        throw error;
    }
}

async function getWeatherInfo(lat, lon) {
    try{
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=wind_speed_10m&timezone=America%2FSao_Paulo`);
        return response.data;
    } catch(error) {
        console.error('Erro ao buscar dados da API:', error);
        throw error;
    }
}

module.exports = { getLocationByName, getWeatherInfo };
