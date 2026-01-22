const Solicitud = require('../models/Solicitud');

exports.crearSolicitud = async(req, res) => {
    try {
        const nuevaSolicitud = new Solicitud(req.body);
        await nuevaSolicitud.save();
        res.json(nuevaSolicitud);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al crear la solicitud');
    }
};

exports.obtenerSolicitudes = async(req, res) => {
    try {
        const solicitudes = await Solicitud.find().sort({ fecha: -1 });
        res.json(solicitudes);
    } catch (error) {
        res.status(500).send('Hubo un error al obtener las solicitudes');
    }
};

exports.actualizarSolicitud = async(req, res) => {
    try {
        const { nombreCliente, email, empresa, servicio, mensaje, estado } = req.body;

        let solicitud = await Solicitud.findById(req.params.id);
        if (!solicitud) {
            return res.status(404).send('No existe la solicitud');
        }

        solicitud = await Solicitud.findByIdAndUpdate(
            req.params.id, { nombreCliente, email, empresa, servicio, mensaje, estado }, { new: true }
        );

        res.json(solicitud);
    } catch (error) {
        res.status(500).send('Hubo un error al actualizar la solicitud');
    }
};

exports.eliminarSolicitud = async(req, res) => {
    try {
        const solicitud = await Solicitud.findById(req.params.id);
        if (!solicitud) {
            return res.status(404).send('No existe la solicitud');
        }

        await Solicitud.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Solicitud eliminada' });
    } catch (error) {
        res.status(500).send('Hubo un error al eliminar la solicitud');
    }
};