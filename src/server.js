require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const YAML = require('yamljs');
const path = require('node:path');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerDoc = YAML.load(path.join(__dirname, './swagger.yaml'));

const authRoutes = require('./routes/authRoutes');
const sustainableActionRoutes = require('./routes/sustainableActionRoutes');
require('../config/db')();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use('/api/auth', authRoutes);
app.use('/api/actions', sustainableActionRoutes);
app.get('/', (req, res) => {
    res.json({message: 'Welcome to EcoTrack-API', status: 200})
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor na porta ${PORT}`);
});