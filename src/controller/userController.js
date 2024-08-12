const bcrypt = require('bcryptjs');
const pool = require('../config/database');
const jwt = require('jsonwebtoken');

function generateAccessToken(email) {
    const payload = { email };
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '21600s' });
}

exports.signup = async (req, res) => {
    const { name, email, password, birthdate } = req.body;
    const creationDate = new Date();
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

exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const client = await pool.connect();
        const userExists = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        if(userExists.rows.length > 0 ){
            const user = userExists.rows[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch){
                const token = generateAccessToken(email);
                client.release();
                return res.status(200).json({ token });
            } else {
                client.release();
                return res.status(400).send('Senha incorreta!')
            }
        } else {
            client.release();
            return res.status(404).send('Usuário não encontrado.')
        }
    } catch(error) {
        console.error('Erro ao realizar login: ', error);
        res.status(500).send('Erro ao realizar login!');
    }
};

exports.readUser = async (req, res) => {
    const { id } = req.body;

    try {
        const client = await pool.connect();
        const user = await client.query('SELECT * FROM users WHERE id = $1', [id]);
        if(user.rows.length > 0){
            client.release();
            return res.status(200).json({ user: user.rows[0] });
        }else{
            client.release();
            return res.status(404).send('Usuário não encontrado.')
        }
    } catch(error) {
        console.error('Erro ao buscar usuário: ', error);
        res.status(500).send('Erro ao buscar usuário!');
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.user;

    try {
        const client = await pool.connect();
        
        const userExists = await client.query('SELECT * FROM users WHERE id = $1', [id]);
        if (userExists.rows.length === 0) {
            client.release();
            return res.status(404).send('Usuário não encontrado.');
        }
        await client.query('DELETE FROM users WHERE id = $1', [id]);
        client.release();
        res.status(200).json({ message: 'Usuário excluído com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir usuário: ', error);
        res.status(500).json({ error: 'Erro ao excluir usuário.' });
    }
};

// TODO
// put user
// insert img
