const Solicitud = require('../models/Solicitud');

exports.crearSolicitud = async(req, res) => {
    try {
        const { nombreCliente, email, servicio, empresa, mensaje, estado } = req.body;

        if (!nombreCliente || !email || !servicio) {
            return res.status(400).json({ msg: 'Faltan campos requeridos' });
        }

        const nuevaSolicitud = new Solicitud({
            nombreCliente,
            email,
            servicio,
            empresa: empresa || '',
            mensaje: mensaje || '',
            estado: estado || 'nuevo'
        });

        await nuevaSolicitud.save();
        res.status(201).json(nuevaSolicitud);
    } catch (error) {
        console.error('Error al crear solicitud:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

exports.obtenerSolicitudes = async(req, res) => {
    try {
        const solicitudes = await Solicitud.find().sort({ fecha: -1 });
        res.json(solicitudes);
    } catch (error) {
        console.error('Error al obtener solicitudes:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

exports.actualizarSolicitud = async(req, res) => {
    try {
        const { nombreCliente, email, empresa, servicio, mensaje, estado } = req.body;

        const solicitud = await Solicitud.findById(req.params.id);
        if (!solicitud) {
            return res.status(404).json({ msg: 'Solicitud no encontrada' });
        }

        const actualizada = await Solicitud.findByIdAndUpdate(
            req.params.id, { nombreCliente, email, empresa: empresa || '', servicio, mensaje: mensaje || '', estado }, { new: true }
        );

        res.json(actualizada);
    } catch (error) {
        console.error('Error al actualizar solicitud:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

exports.eliminarSolicitud = async(req, res) => {
    try {
        const solicitud = await Solicitud.findById(req.params.id);
        if (!solicitud) {
            return res.status(404).json({ msg: 'Solicitud no encontrada' });
        }

        await Solicitud.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Solicitud eliminada' });
    } catch (error) {
        console.error('Error al eliminar solicitud:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};