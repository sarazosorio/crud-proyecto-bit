require('dotenv').config();
const express = require('express');
const router = require('./routes/solicitud')
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router)

app.get('/', (req, res) => {
    res.send('Hola! Bienvenidos al servidor con express')
})



module.exports = app