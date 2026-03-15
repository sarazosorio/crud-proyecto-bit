require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/solicitud');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();


app.use(cors({
    origin: 'https://frontend-proyecto-bit.vercel.app/', // o '*' temporal para pruebas
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/api', router);

app.get('/', (req, res) => {
    res.send('Hola! Bienvenidos al servidor con express');
});

module.exports = app;