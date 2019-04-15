// Load env variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 3000;

const logger = require('./middleware/logger');
const genresRoutes = require('./routes/genres');
const customerRoutes = require('./routes/customers');

mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true })
    .then(() => console.log('Connected to the DB'))
    .catch(err => console.error('Could not connect to the DB', err));

app.use(express.json());
app.use(logger);

app.use('/api/genres', genresRoutes);
app.use('/api/customers', customerRoutes);

app.get('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' }); 
});

app.listen(port, () => {
    console.log('Server listening at port ' + port);
});
