require('dotenv').config();
const express = require('express')
const cors = require('cors');
const conectarDB = require('./config/db')
const router = require('./routes/solicitud')
const app = express();
const port = 3000

conectarDB()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router)

app.get('/', (req, res) => {
    res.send('Hola! Bienvenidos al servidor con express')
})

app.listen(port, () => {
    console.log('Servidor escuchando en el puerto ' + port)
})