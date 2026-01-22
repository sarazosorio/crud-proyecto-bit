const mongoose = require('mongoose');

const conectarDB = async() => {
    try {
        const dbUri = process.env.DB_MONGO
        if (!dbUri) {
            throw new Error('La variable de entorno aun no esta definida')
        }
        await mongoose.connect(dbUri, {})
        console.log("Conectada a mi base de datos de mi proyecto")
    } catch (error) {
        console.error('Error al conectar a MongoDB: ', error);
        process.exit(1)
    }
}

module.exports = conectarDB;