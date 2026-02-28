require('dotenv').config();
const conectarDB = require('./config/db')

const app = require('./app.js')
const port = 3000

//conectarDB()
async function start() {
    await conectarDB()

    app.listen(port, () => {
        console.log('Servidor escuchando en el puerto ' + port)
    })
}

start()