const pool = require('../config/database');

exports.newPost = async (req, res) => {
    const { id } = req.user;
    const { title, tag1, tag2, travels_id } = req.body;
    const postdate = new Date();
    const likes = 0;

    try {
        const client = await pool.connect();
        const userExists = await client.query('SELECT * FROM users WHERE id = $1', [id]);
        if (userExists.rows.length > 0) {
            await client.query(
                'INSERT INTO posts (title, tag1, tag2, postdate, likes, travels_id, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                [title, tag1, tag2, postdate, likes, travels_id, id]
            );
            client.release();
            return res.status(201).send('Post publicado com sucesso!');
        } else {
            client.release();
            return res.status(400).send('Ocorreu um erro ao criar o post!');
        }
    } catch (error) {
        console.error('Erro ao criar post: ', error);
        res.status(500).json({ error: 'Erro ao criar post!' });
    }
};
