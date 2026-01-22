const express = require('express');
const router = express.Router();

const solicitudController = require('../controllers/solicitudController');

router.post('/solicitud', solicitudController.crearSolicitud);
router.get('/solicitud', solicitudController.obtenerSolicitudes);
router.put('/solicitud/:id', solicitudController.actualizarSolicitud);
router.delete('/solicitud/:id', solicitudController.eliminarSolicitud);

module.exports = router;