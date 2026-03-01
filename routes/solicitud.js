/**
 * @swagger
 * components:
 *   schemas:
 *     Solicitud:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         nombreCliente:
 *           type: string
 *         email:
 *           type: string
 *         empresa:
 *           type: string
 *         servicio:
 *           type: string
 *         mensaje:
 *           type: string
 *         estado:
 *           type: string
 *           enum: [nuevo, en progreso, completado]
 *         fecha:
 *           type: string
 *           format: date
 *     CrearSolicitud:
 *       type: object
 *       required:
 *         - nombreCliente
 *         - email
 *         - servicio
 *         - mensaje
 *       properties:
 *         nombreCliente:
 *           type: string
 *           example: Juan Pérez
 *         email:
 *           type: string
 *           example: juan@email.com
 *         empresa:
 *           type: string
 *           example: Mi Empresa S.A
 *         servicio:
 *           type: string
 *           example: Desarrollo Web
 *         mensaje:
 *           type: string
 *           example: Necesito una página web corporativa
 *         estado:
 *           type: string
 *           enum: [nuevo, en progreso, completado]
 *           example: nuevo
 *     ActualizarSolicitud:
 *       type: object
 *       properties:
 *         nombreCliente:
 *           type: string
 *           example: Juan Pérez
 *         email:
 *           type: string
 *           example: juan@email.com
 *         empresa:
 *           type: string
 *           example: Mi Empresa S.A
 *         servicio:
 *           type: string
 *           example: Desarrollo Web
 *         mensaje:
 *           type: string
 *           example: Mensaje actualizado
 *         estado:
 *           type: string
 *           enum: [nuevo, en progreso, completado]
 *           example: en progreso
 */

const express = require('express');
const router = express.Router();

const solicitudController = require('../controllers/solicitudController');

/**
 * @swagger
 * /solicitud:
 *   post:
 *     summary: Crear una nueva solicitud
 *     tags: [Solicitudes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearSolicitud'
 *     responses:
 *       201:
 *         description: Solicitud creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Solicitud'
 */
router.post('/solicitud', solicitudController.crearSolicitud);

/**
 * @swagger
 * /solicitud:
 *   get:
 *     summary: Obtener todas las solicitudes
 *     tags: [Solicitudes]
 *     responses:
 *       200:
 *         description: Lista de solicitudes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Solicitud'
 */
router.get('/solicitud', solicitudController.obtenerSolicitudes);

/**
 * @swagger
 * /solicitud/{id}:
 *   put:
 *     summary: Actualizar una solicitud
 *     tags: [Solicitudes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ActualizarSolicitud'
 *     responses:
 *       200:
 *         description: Solicitud actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Solicitud'
 */
router.put('/solicitud/:id', solicitudController.actualizarSolicitud);

/**
 * @swagger
 * /solicitud/{id}:
 *   delete:
 *     summary: Eliminar una solicitud
 *     tags: [Solicitudes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Solicitud eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Solicitud eliminada
 */
router.delete('/solicitud/:id', solicitudController.eliminarSolicitud);

module.exports = router;