const nodemailer =  require('nodemailer');

async function sendEmail(newUser) { // Pasar los datos del usuario como argumento
    const transport = nodemailer.createTransport({
      service: "Gmail",
      port: 465, 
      secure: true, 
      auth: {
        user: "my.hyperevents@gmail.com",
        pass: "lbgkhodyukbjxrdk",
      },
    });

    const imageUrl ="https://cdn.discordapp.com/attachments/1137881023183593592/1142140899976032296/OIG.png";
    const emailContent = `
    <div style="background-color: #f2f2f2; padding: 20px;">
      <div style="background-color: #ffffff; border-radius: 10px; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #333;">¡Bienvenido a  HYPER EVENTS!</h2>
        <p>Hola ${newUser.username},</p>
        <p>Gracias por registrarte en HYPER EVENTS. ¡Te damos la bienvenida a nuestra comunidad!...</p>
        <p>Tus detalles de cuenta:</p>
        <ul>
          <li>Nombre de usuario: ${newUser.username}</li>
          <li>Correo electrónico: ${newUser.email}</li>
        </ul>
        <p>Recuerda que puedes acceder a tu cuenta en cualquier momento para explorar y participar en los eventos que más te interesen...</p>
        <p>¡Esperamos verte pronto en HYPER EVENTS!</p>
        <p>Saludos,<br>El equipo de HYPER EVENTS</p>
        <img src="${imageUrl}" alt="Imagen de firma" style="max-width: 20%; margin-top: 20px;">
      </div>
    </div>
  `;
      try {
          await transport.sendMail( {
            from: "my.hyperevents@gmail.com",
            to: newUser.email,
            subject: "¡Bienvenido a HYPER EVENTS!",
            html: emailContent,

                });
                console.log('Correo electrónico enviado correctamente.');
              } catch (error) {
                console.error('Error al enviar el correo electrónico:', error);
              };        
   
    }

    module.exports = sendEmail
