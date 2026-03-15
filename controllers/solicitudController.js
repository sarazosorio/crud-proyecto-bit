const Solicitud = require('../models/Solicitud');

// Crear una nueva solicitud
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

        // Devolver la lista completa de solicitudes después de crear la nueva
        const solicitudesActualizadas = await Solicitud.find().sort({ fecha: -1 });

        res.status(201).json({
            msg: 'Solicitud creada correctamente',
            solicitud: nuevaSolicitud,
            solicitudes: solicitudesActualizadas
        });
    } catch (error) {
        console.error('Error al crear solicitud:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

// Obtener todas las solicitudes
exports.obtenerSolicitudes = async(req, res) => {
    try {
        const solicitudes = await Solicitud.find().sort({ fecha: -1 });
        res.json(solicitudes);
    } catch (error) {
        console.error('Error al obtener solicitudes:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

// Actualizar solicitud
exports.actualizarSolicitud = async(req, res) => {
    try {
        const { nombreCliente, email, empresa, servicio, mensaje, estado } = req.body;

        const solicitud = await Solicitud.findById(req.params.id);
        if (!solicitud) {
            return res.status(404).json({ msg: 'Solicitud no encontrada' });
        }

        // Actualizar solo los campos enviados
        solicitud.nombreCliente = nombreCliente || solicitud.nombreCliente;
        solicitud.email = email || solicitud.email;
        solicitud.empresa = empresa || solicitud.empresa;
        solicitud.servicio = servicio || solicitud.servicio;
        solicitud.mensaje = mensaje || solicitud.mensaje;
        solicitud.estado = estado || solicitud.estado;

        await solicitud.save();

        // Devolver todas las solicitudes actualizadas
        const solicitudesActualizadas = await Solicitud.find().sort({ fecha: -1 });

        res.json({
            msg: 'Solicitud actualizada correctamente',
            solicitud,
            solicitudes: solicitudesActualizadas
        });
    } catch (error) {
        console.error('Error al actualizar solicitud:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

// Eliminar solicitud
exports.eliminarSolicitud = async(req, res) => {
    try {
        const solicitud = await Solicitud.findById(req.params.id);
        if (!solicitud) {
            return res.status(404).json({ msg: 'Solicitud no encontrada' });
        }

        await Solicitud.findByIdAndDelete(req.params.id);

        // Devolver todas las solicitudes después de eliminar
        const solicitudesActualizadas = await Solicitud.find().sort({ fecha: -1 });

        res.json({
            msg: 'Solicitud eliminada',
            solicitudes: solicitudesActualizadas
        });
    } catch (error) {
        console.error('Error al eliminar solicitud:', error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};