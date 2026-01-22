const mongoose = require('mongoose');

const SolicitudSchema = mongoose.Schema({
    fecha: {
        type: Date,
        default: Date.now
    },
    nombreCliente: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    empresa: {
        type: String
    },
    servicio: {
        type: String,
        required: true
    },
    mensaje: {
        type: String
    },
    estado: {
        type: String,
        enum: ['nuevo', 'en progreso', 'completado'],
        default: 'nuevo'
    }
});

module.exports = mongoose.model('Solicitud', SolicitudSchema);