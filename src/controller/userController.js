const bcrypt = require('bcrypt');
const pool = require('../config/database');

exports.signup = async (req, res) => {
    const { name, email, password, birthdate } = req.body;
    const creationDate = Date.now();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const client = await pool.connect();
        const userExists = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userExists.rows.length > 0) {
            client.release();
            return res.status(400).send('Usuário já existe!');
        } else {
            const newUser = await client.query(
                'INSERT INTO users (name, email, password, birthdate, creationDate) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [name, email, hashedPassword, birthdate, creationDate]
            );
            client.release();
            res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user: newUser.rows[0] });
        }
    } catch (error) {
        console.error('Erro ao cadastrar usuário: ', error);
        res.status(500).json({ error: 'Erro ao cadastrar usuário!' });
    }
};