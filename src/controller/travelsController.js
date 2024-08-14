const pool = require('../config/database');
const { getLocationByName } = require('../controller/weatherController');

exports.newTravel = async (req, res) => {
    const {
        location, nativeLanguage, languageSpoken, 
        passportReq, distanceToBrazil, flightCompany, 
        flightClass, flightPrice, hostingType, 
        hostingDays, hostingDailyPrice, hostingScore 
    } = req.body;

    const { id } = req.user;

    try {
        const client = await pool.connect();
        const userExists = await client.query('SELECT * FROM users WHERE id = $1', [id]);
        if (userExists.rows.length === 0) {
            client.release();
            return res.status(404).send('Usuário não encontrado.');
        }
        const newTravel = await client.query(
            'INSERT INTO travels (location, nativeLanguage, languageSpoken, passportReq, distanceToBrazil, flightCompany, flightClass, flightPrice, hostingType, hostingDays, hostingDailyPrice, hostingScore, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *',
            [
                location, nativeLanguage, languageSpoken, 
                passportReq, distanceToBrazil, flightCompany, 
                flightClass, flightPrice, hostingType, 
                hostingDays, hostingDailyPrice, hostingScore, id 
            ]
        );
        client.release();
        res.status(201).json({ message: 'Viagem registrada com sucesso!', travel: newTravel.rows[0] });
    } catch (error) {
        console.error('Erro ao registrar viagem: ', error);
        res.status(500).json({ error: 'Erro ao registrar viagem!' });
    }
};

exports.getTravelsByUserId = async (req, res) => {
    const { id } = req.user;

    try { 
        const client = await pool.connect();
        const userExists = await client.query('SELECT * FROM users WHERE id = $1', [id]);
        if (userExists.rows.length === 0) {
            client.release();
            return res.status(404).send('Usuário não encontrado.');
        }
        const travels = await client.query('SELECT * FROM travels WHERE user_id = $1', [id]);
        const locationsPromises = travels.rows.map(travel => getLocationByName(travel.location));
        const locationsData = await Promise.all(locationsPromises);
        client.release();

        const travelsWithLocation = travels.rows.map((travel, index) => {
            return {
                ...travel,
                locationData: locationsData[index]
            };
        });
        res.status(200).json({ travels: travelsWithLocation });
    } catch(error) {
        console.error('Erro ao buscar viagens: ', error);
        res.status(500).json({ error: 'Erro ao buscar viagens!' });
    }
};

exports.deleteTravel = async (req, res) => {
    const { id } = req.user;
    const { travel_id } = req.body;

    try {
        const client = await pool.connect();
        const travelExists = await client.query('SELECT * FROM travels WHERE id = $1 AND user_id = $2', [travel_id, id]);
        client.release();
        if (travelExists.rows.length > 0) {
            await client.query('DELETE FROM travels WHERE id = $1', [travel_id]);
            return res.status(200).send('Viagem deletada com sucesso.');
        } else {
            return res.status(404).send('Viagem não encontrada ou não pertence ao usuário.');
        }
    } catch (error) {
        console.error('Erro ao excluir viagem: ', error);
        res.status(500).send('Erro ao excluir viagem.');
    }
};
