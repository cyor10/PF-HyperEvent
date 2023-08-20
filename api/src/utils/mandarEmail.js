const nodemailer =  require('nodemailer');


async function sendEmail(email) {
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "2097c46fa09a71",
          pass: "e77a9c2ddd0437"
        }
      });
        //const { destinatario, asunto, contenido } = req.body;

        const mailOptions = {
            from: 'jose_f_dirazar@hotmail.com',
            to: email,
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        };

        try {
            await transport.sendMail(mailOptions);

            return transport
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error);
            res.status(500).json({ message: 'Error al enviar el correo electrónico' });
        }
    }

    module.exports = sendEmail
