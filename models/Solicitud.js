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
        type: String,
        default: ''
    },
    servicio: {
        type: String,
        required: true
    },
    mensaje: {
        type: String,
        default: ''
    },
    estado: {
        type: String,
        enum: ['nuevo', 'en progreso', 'completado'],
        default: 'nuevo'
    }
});

module.exports = mongoose.model('Solicitud', SolicitudSchema);