const { version } = require('mongoose')
const swaggerJSDoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Notas',
            version: '1.0.0',
            description: 'API para gestionar solicitudes'
        },
        servers: [{
            url: 'http://localhost:3000/api'

        }]
    },
    apis: ['./routes/*.js']
}
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;