const nodemailer = require('nodemailer');

exports.enviarCorreo = async(req, res) => {
    try {
        const { nombreCliente, email, empresa, servicio, mensaje } = req.body;

        if (!nombreCliente || !email || !servicio || !mensaje) {
            return res.status(400).json({ msg: 'Faltan campos requeridos' });
        }

        // 🔐 CONFIGURAR TU CORREO (GMAIL EJEMPLO)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // tu correo
                pass: process.env.EMAIL_PASS // contraseña de aplicación
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // te llega a ti mismo
            subject: 'Solicitud de ClickPrime',
            html: `
                <div style="
        font-family: 'Arial', sans-serif;
        background: linear-gradient(135deg, #ffe4f1, #fff0f6);
        padding: 30px;
    ">

        <div style="
            max-width: 620px;
            margin: auto;
            background: #ffffff;
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(255, 105, 180, 0.25);
            border: 1px solid #ffd1e8;
        ">
         <!-- LOGO -->
            <div style="text-align:center; padding: 20px; background:#fff;">
                <img 
                    src="https://res.cloudinary.com/divubamzo/image/upload/v1777769054/logo_jc3ise.png"
                    alt="Logo"
                    style="max-width: 140px; border-radius: 10px;"
                />
            </div>

            <!-- HEADER -->
            <div style="
                background: linear-gradient(90deg, #ff4fa3, #ff85c1);
                color: white;
                text-align: center;
                padding: 20px;
                font-size: 22px;
                font-weight: bold;
                letter-spacing: 1px;
            ">
                 Nueva Solicitud Recibida 
            </div>

            <!-- BODY -->
            <div style="padding: 25px; color: #333;">

                <p style="font-size: 16px;">
                    ✨ Has recibido una nueva solicitud desde tu formulario web.
                </p>

                <div style="
                    margin-top: 15px;
                    padding: 15px;
                    border-radius: 12px;
                    background: #fff5fa;
                    border-left: 5px solid #ff69b4;
                ">
                    <p><strong>👤 Nombre:</strong> ${nombreCliente}</p>
                    <p><strong>📧 Email:</strong> ${email}</p>
                    <p><strong>🏢 Empresa:</strong> ${empresa || '-'}</p>
                    <p><strong>💻Servicio:</strong> ${servicio}</p>
                </div>

                <div style="margin-top: 20px;">
                    <p style="font-weight: bold; color: #ff4fa3;">💬 Mensaje:</p>

                    <div style="
                        background: #fff0f6;
                        padding: 15px;
                        border-radius: 12px;
                        font-style: italic;
                        color: #444;
                        border: 1px solid #ffd1e8;
                    ">
                        ${mensaje}
                    </div>
                </div>

            </div>

            <!-- FOOTER -->
            <div style="
                text-align: center;
                padding: 12px;
                font-size: 12px;
                color: #999;
                background: #fafafa;
            ">
                    2026
            </div>

        </div>
    </div>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ msg: 'Correo enviado correctamente' });

    } catch (error) {
        console.error('Error enviando correo:', error);
        res.status(500).json({ msg: 'Error al enviar correo' });
    }
};