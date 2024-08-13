require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Rotas
const userRoutes = require('./routes/user');
const travelRoutes = require('./routes/travels');
const weatherRoutes = require('./routes/weather');

app.use('/users', userRoutes);
app.use('/travels', travelRoutes);
app.use('/weather', weatherRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
