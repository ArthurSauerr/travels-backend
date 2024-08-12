require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Rotas
const userRoutes = require('./routes/user');
const travelRoutes = require('./routes/travels');

app.use('/users', userRoutes);
app.use('/travels', travelRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
