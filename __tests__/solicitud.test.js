const request = require("supertest")
const mongoose = require("mongoose")
const { MongoMemoryServer } = require("mongodb-memory-server")

const app = require("../app")
const Solicitud = require("../models/Solicitud")

jest.setTimeout(30000)

let mongoServer

beforeAll(async() => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    await mongoose.connect(uri, { dbName: "test" })
})

afterAll(async() => {
    await mongoose.disconnect()
    if (mongoServer) await mongoServer.stop()
})

beforeEach(async() => {
    await Solicitud.deleteMany({})
})

describe("Solicitud API", () => {

    describe("POST - Crear solicitud", () => {

        test("Debe crear una solicitud correctamente", async() => {
            const nuevaSolicitud = {
                nombreCliente: "Sara",
                email: "sara@test.com",
                empresa: "Mi Empresa",
                servicio: "Desarrollo Web",
                mensaje: "Necesito una página web",
                estado: "nuevo"
            }

            const resp = await request(app)
                .post("/api/solicitud")
                .send(nuevaSolicitud)
                .expect(200)

            expect(resp.body).toHaveProperty("_id")
            expect(resp.body.nombreCliente).toBe(nuevaSolicitud.nombreCliente)

            const solicitudEnDB = await Solicitud.findById(resp.body._id)
            expect(solicitudEnDB).not.toBeNull()
        })

    })

    describe("GET - Obtener solicitudes", () => {

        test("Debe obtener todas las solicitudes", async() => {
            await Solicitud.create([{
                    nombreCliente: "Cliente 1",
                    email: "c1@test.com",
                    empresa: "Empresa 1",
                    servicio: "App",
                    mensaje: "Mensaje 1",
                    estado: "nuevo"
                },
                {
                    nombreCliente: "Cliente 2",
                    email: "c2@test.com",
                    empresa: "Empresa 2",
                    servicio: "Web",
                    mensaje: "Mensaje 2",
                    estado: "completado"
                }
            ])

            const resp = await request(app)
                .get("/api/solicitud")
                .expect(200)

            expect(resp.body.length).toBe(2)
            expect(resp.body[0]).toHaveProperty("nombreCliente")
        })
    })

    describe("PUT - Actualizar solicitud", () => {

        test("Debe actualizar una solicitud existente", async() => {
            const solicitud = await Solicitud.create({
                nombreCliente: "Viejo",
                email: "viejo@test.com",
                empresa: "Empresa Vieja",
                servicio: "Web",
                mensaje: "Mensaje viejo",
                estado: "nuevo"
            })

            const datosActualizados = {
                nombreCliente: "Nuevo",
                email: "nuevo@test.com",
                empresa: "Empresa Nueva",
                servicio: "App",
                mensaje: "Mensaje nuevo",
                estado: "completado"
            }

            const resp = await request(app)
                .put(`/api/solicitud/${solicitud._id}`)
                .send(datosActualizados)
                .expect(200)

            expect(resp.body.nombreCliente).toBe("Nuevo")
            expect(resp.body.estado).toBe("completado")
        })

        test("Debe devolver 404 si no existe la solicitud", async() => {
            const idFalso = new mongoose.Types.ObjectId()

            await request(app)
                .put(`/api/solicitud/${idFalso}`)
                .send({ nombreCliente: "X" })
                .expect(404)
        })
    })

    describe("DELETE - Eliminar solicitud", () => {

        test("Debe eliminar una solicitud existente", async() => {
            const solicitud = await Solicitud.create({
                nombreCliente: "Eliminar",
                email: "eliminar@test.com",
                empresa: "Empresa",
                servicio: "Web",
                mensaje: "Mensaje",
                estado: "nuevo"
            })

            const resp = await request(app)
                .delete(`/api/solicitud/${solicitud._id}`)
                .expect(200)

            expect(resp.body.msg).toBe("Solicitud eliminada")

            const solicitudEnDB = await Solicitud.findById(solicitud._id)
            expect(solicitudEnDB).toBeNull()
        })

        test("Debe devolver 404 si no existe la solicitud", async() => {
            const idFalso = new mongoose.Types.ObjectId()

            await request(app)
                .delete(`/api/solicitud/${idFalso}`)
                .expect(404)
        })
    })

})